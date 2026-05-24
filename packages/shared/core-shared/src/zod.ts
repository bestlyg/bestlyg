import { z } from 'zod';

type AnyZodSchema = z.ZodType;

// 这些内部字段不能出现在 JSON 或 Object.keys 中，所以用 symbol + non-enumerable 保存。
const zodRawSymbol = Symbol('zod-model-raw');
const zodDumpKeysSymbol = Symbol('zod-model-dump-keys');
const zodConfigSymbol = Symbol('zod-model-config');

/** 挂在模型构造器上的 schema 标记，用于运行时识别 ZodModel。 */
export const zodSchemaSymbol = Symbol('zod-schema');

/** Zod 模型配置。 */
export interface ZodModelConfig {
    /** 匿名模型或直接工厂模型的兜底名称；class extends 写法默认使用 class name。 */
    name?: string;
}

/** modelCopy 的复制选项。 */
export type ZodModelCopyOptions<T extends AnyZodSchema = AnyZodSchema> = {
    /** 覆盖到 dump 数据上的字段，合并后会重新经过 schema 校验。 */
    update?: Partial<z.input<T>> | Partial<z.output<T>> | Record<string, unknown>;
    /** 是否先深拷贝当前 dump 数据，避免新旧模型共享嵌套对象引用。 */
    deep?: boolean;
};

/** 模型实例类型：包含 schema 推导出的数据字段和 ZodModel 实例方法。 */
export type ZodModelInstance<T extends AnyZodSchema = AnyZodSchema> = z.output<T> & ZodModel<T>;

/** safeParse 的返回结构，错误会被统一包成 ZodModelValidationError。 */
export type ZodModelSafeParseReturn<T extends AnyZodSchema = AnyZodSchema> =
    | { success: true; data: ZodModelInstance<T> }
    | { success: false; error: ZodModelValidationError<T> };

/** 带 Zod schema 元信息的模型构造器。 */
export interface ZodModelConstructor<T extends AnyZodSchema = AnyZodSchema> {
    /** 用原始输入创建模型实例，构造时立即执行 schema 校验。 */
    new (raw?: z.input<T>): ZodModelInstance<T>;
    readonly [zodSchemaSymbol]: T;
    readonly modelName: string;
    /** 返回当前模型绑定的 Zod schema。 */
    getSchema(): T;
    /** 返回模型配置。 */
    getConfig(): ZodModelConfig;
    /** 返回运行时模型名，默认是最终 subclass 的 class name。 */
    getModelName(): string;
    /** Pydantic 风格的显式校验入口，成功时返回模型实例。 */
    modelValidate(raw?: z.input<T>): ZodModelInstance<T>;
    /** modelValidate 的短别名。 */
    parse(raw?: z.input<T>): ZodModelInstance<T>;
    /** 不抛异常的校验入口。 */
    safeParse(raw?: z.input<T>): ZodModelSafeParseReturn<T>;
    /** 判断 value 是否是当前模型构造器创建的实例。 */
    is(value: unknown): value is ZodModelInstance<T>;
}

/** 判断对象是否是 ZodModel.withSchema/createZodModel 创建的模型构造器。 */
export function isZodModel(o: unknown): o is ZodModelConstructor {
    if (typeof o !== 'function') return false;
    return Boolean((o as any)[zodSchemaSymbol]);
}

export class ZodModelValidationError<T extends AnyZodSchema = AnyZodSchema> extends TypeError {
    /** Zod 原始 issue 列表，便于上层格式化字段级错误。 */
    readonly issues: z.ZodIssue[];
    /** 触发校验失败的原始输入。 */
    readonly raw: unknown;
    /** 参与校验的 schema。 */
    readonly schema: T;
    /** 失败模型的运行时名称。 */
    readonly modelName: string;
    /** 原始 ZodError，保留给需要 format/flatten 的调用方。 */
    readonly zodError: z.ZodError<z.output<T>>;

    constructor(modelName: string, zodError: z.ZodError<z.output<T>>, raw: unknown, schema: T) {
        super(`${modelName} validation failed\n${z.prettifyError(zodError)}`, {
            cause: { raw, schema, zodError },
        });
        this.name = 'ZodModelValidationError';
        this.issues = zodError.issues;
        this.raw = raw;
        this.schema = schema;
        this.modelName = modelName;
        this.zodError = zodError;
        Error.captureStackTrace?.(this, ZodModelValidationError);
    }
}

/**
 * Pydantic 风格的 Zod 模型基类。
 *
 * 推荐写法：
 * class UserModel extends ZodModel.withSchema(UserSchema) {}
 */
export abstract class ZodModel<T extends AnyZodSchema = AnyZodSchema> {
    constructor(raw?: z.input<T>) {
        const cstr = this.constructor as unknown as ZodModelConstructor<T>;
        const schema = cstr.getSchema();
        const result = schema.safeParse(raw);

        if (!result.success) {
            throw new ZodModelValidationError(cstr.getModelName(), result.error, raw, schema);
        }

        const plain = result.data as z.output<T>;
        if (Array.isArray(plain)) return plain as any;

        const dumpKeys = getEnumerableStringKeys(plain);
        assertNoReservedKeys(dumpKeys, cstr.getModelName(), 'parsed data');

        // 只记录 schema 解析出的字段，避免后续用户临时挂载属性时污染 modelDump。
        defineHiddenValue(this, zodRawSymbol, raw);
        defineHiddenValue(this, zodDumpKeysSymbol, dumpKeys);
        Object.assign(this, plain);
    }

    /** 将 schema 绑定到一个可被 class extends 的中间父类上。 */
    static withSchema<T extends AnyZodSchema>(
        schema: T,
        config: ZodModelConfig = {},
    ): ZodModelConstructor<T> {
        return createZodModelClass(schema, config);
    }

    /** 静态模型名属性，方便 Swagger、日志或调试读取。 */
    static get modelName() {
        return this.getModelName();
    }

    /** 获取当前模型类绑定的 Zod schema。 */
    static getSchema(): AnyZodSchema {
        const schema = (this as any)[zodSchemaSymbol];
        if (!schema) {
            throw new TypeError(`${this.name || 'ZodModel'} does not declare a Zod schema`);
        }
        return schema;
    }

    /** 获取模型配置。 */
    static getConfig(): ZodModelConfig {
        return (this as any)[zodConfigSymbol] ?? {};
    }

    /** 获取模型名：显式 config.name 优先，否则使用最终 class name。 */
    static getModelName() {
        const configName = this.getConfig().name;
        return configName || this.name || 'ZodModel';
    }

    /** 校验原始输入并返回模型实例。 */
    static modelValidate<T extends AnyZodSchema>(
        this: ZodModelConstructor<T>,
        raw?: z.input<T>,
    ): ZodModelInstance<T> {
        return new this(raw);
    }

    /** modelValidate 的短别名。 */
    static parse<T extends AnyZodSchema>(
        this: ZodModelConstructor<T>,
        raw?: z.input<T>,
    ): ZodModelInstance<T> {
        return this.modelValidate(raw);
    }

    /** 不抛异常的校验入口，失败时返回结构化 ZodModelValidationError。 */
    static safeParse<T extends AnyZodSchema>(
        this: ZodModelConstructor<T>,
        raw?: z.input<T>,
    ): ZodModelSafeParseReturn<T> {
        try {
            return { success: true, data: this.modelValidate(raw) };
        } catch (error) {
            if (error instanceof ZodModelValidationError) {
                return { success: false, error };
            }
            throw error;
        }
    }

    /** 判断 value 是否由当前模型类构造。 */
    static is<T extends AnyZodSchema>(
        this: ZodModelConstructor<T>,
        value: unknown,
    ): value is ZodModelInstance<T> {
        return value instanceof this;
    }

    /** 返回构造模型时传入的原始输入。 */
    getRaw(): z.input<T> {
        return (this as any)[zodRawSymbol];
    }

    /** 返回当前实例对应模型类的 schema。 */
    getSchema(): T {
        const cstr = this.constructor as unknown as ZodModelConstructor<T>;
        return cstr.getSchema();
    }

    /** 返回当前实例对应模型类的配置。 */
    getConfig(): ZodModelConfig {
        const cstr = this.constructor as unknown as ZodModelConstructor<T>;
        return cstr.getConfig();
    }

    /** 返回当前实例对应模型类的运行时名称。 */
    getModelName() {
        const cstr = this.constructor as unknown as ZodModelConstructor<T>;
        return cstr.getModelName();
    }

    /** 导出业务数据；只包含 schema 解析出的字段，并读取实例当前值。 */
    modelDump(): z.output<T> {
        const dumpKeys = ((this as any)[zodDumpKeysSymbol] ?? []) as string[];
        const plain: Record<string, unknown> = {};

        for (const key of dumpKeys) {
            plain[key] = (this as any)[key];
        }

        return plain as z.output<T>;
    }

    /** 将 modelDump() 序列化为 JSON 字符串。 */
    modelJson(space?: string | number) {
        return JSON.stringify(this.modelDump(), null, space);
    }

    /** 基于当前模型数据创建新实例，update 合并后会重新校验。 */
    modelCopy(options: ZodModelCopyOptions<T> = {}): ZodModelInstance<T> {
        const cstr = this.constructor as unknown as ZodModelConstructor<T>;
        const data = options.deep ? deepClone(this.modelDump()) : this.modelDump();
        return new cstr({ ...(data as any), ...(options.update ?? {}) });
    }

    /** JSON.stringify(model) 时调用，保证只输出业务数据。 */
    toJSON(): z.output<T> {
        return this.modelDump();
    }

    /** String(model) 时调用，输出面向调试的模型字符串。 */
    toString() {
        const name = this.getModelName();
        const entries = Object.entries(this.modelDump() as Record<string, unknown>).map(
            ([key, value]) => `${formatDebugKey(key)}: ${formatDebugValue(value)}`,
        );

        if (entries.length === 0) return `${name} {}`;
        return `${name} { ${entries.join(', ')} }`;
    }

    /** 显式取原始值时返回业务数据快照。 */
    valueOf(): z.output<T> {
        return this.modelDump();
    }

    /** Object.prototype.toString.call(model) 时展示具体模型名。 */
    get [Symbol.toStringTag]() {
        return this.getModelName();
    }
}

/** 基于 Zod schema 创建可被 class extends 的模型父类。 */
export function createZodModel<T extends AnyZodSchema = AnyZodSchema>(
    schema: T,
    config: ZodModelConfig = {},
) {
    return createZodModelClass(schema, config);
}

function createZodModelClass<T extends AnyZodSchema>(
    schema: T,
    config: ZodModelConfig,
): ZodModelConstructor<T> {
    const normalizedConfig = { ...config };
    const schemaKeys = getSchemaKeys(schema);
    assertNoReservedKeys(schemaKeys, normalizedConfig.name || 'ZodModel', 'schema');

    class ZodModelWithSchema extends ZodModel<T> {}

    // 中间父类需要携带 schema/config；最终 subclass 会继承这些静态元信息。
    Object.defineProperties(ZodModelWithSchema, {
        name: {
            value: normalizedConfig.name || 'ZodModel',
            configurable: true,
        },
        [zodSchemaSymbol]: {
            value: schema,
            enumerable: false,
        },
        [zodConfigSymbol]: {
            value: normalizedConfig,
            enumerable: false,
        },
    });

    return ZodModelWithSchema as unknown as ZodModelConstructor<T>;
}

/** 定义不可枚举的实例内部字段，避免影响 JSON、展开对象和 Object.keys。 */
function defineHiddenValue(target: object, key: PropertyKey, value: unknown) {
    Object.defineProperty(target, key, {
        value,
        writable: true,
        enumerable: false,
        configurable: false,
    });
}

/** 获取 ZodObject 的字段名；数组等非对象 schema 没有字段需要检查。 */
function getSchemaKeys(schema: AnyZodSchema) {
    const shape = (schema as { shape?: unknown }).shape;
    if (!shape || typeof shape !== 'object') return [];
    return Object.keys(shape);
}

/** 获取可 dump 的业务字段名；非对象输出没有字段需要 dump。 */
function getEnumerableStringKeys(value: unknown) {
    if (!value || typeof value !== 'object') return [];
    return Object.keys(value);
}

/** 模型协议占用的保留字段名，schema 不能声明这些字段。 */
const reservedModelKeys = new Set<string>([
    '__proto__',
    'constructor',
    'getConfig',
    'getModelName',
    'getRaw',
    'getSchema',
    'modelCopy',
    'modelDump',
    'modelJson',
    'toJSON',
    'toString',
    'valueOf',
]);

/** 在模型创建和实例构造时都检查一次，避免 transform 后产物覆盖模型方法。 */
function assertNoReservedKeys(keys: readonly string[], modelName: string, source: string) {
    const conflicts = keys.filter((key) => reservedModelKeys.has(key));
    if (!conflicts.length) return;

    throw new TypeError(
        `${modelName} ${source} uses reserved model key(s): ${conflicts.join(', ')}`,
    );
}

/** 轻量深拷贝，用于 modelCopy({ deep: true })。 */
function deepClone<T>(value: T): T {
    if (!value || typeof value !== 'object') return value;

    try {
        if (typeof globalThis.structuredClone === 'function') {
            return globalThis.structuredClone(value);
        }
    } catch {
        // Fall through to the small clone helper below.
    }

    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item)) as T;
    }

    if (value instanceof Date) {
        return new Date(value.getTime()) as T;
    }

    if (Object.getPrototypeOf(value) !== Object.prototype) return value;

    const cloned: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
        cloned[key] = deepClone(item);
    }
    return cloned as T;
}

/** 调试字符串里，对非标识符 key 使用 JSON 字符串格式展示。 */
function formatDebugKey(key: string) {
    if (/^[A-Za-z_$][\w$]*$/.test(key)) return key;
    return JSON.stringify(key);
}

/** 调试字符串里的值展示，尽量接近对象字面量而不是完整 JSON 文档。 */
function formatDebugValue(value: unknown): string {
    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'bigint') return `${value}n`;
    if (value === undefined) return 'undefined';
    if (value === null || typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    try {
        const json = JSON.stringify(value);
        if (json !== undefined) return json;
    } catch {
        // Fall through to String for circular or custom values.
    }

    return Object.prototype.toString.call(value);
}

export const TYPE_SEPARATOR = '@';
export const CONFIG_KEY_SEPARATOR = ':';

/** 配置项异步校验器，允许按当前配置项和上下文配置值做自定义校验。 */
export type ConfigValidator = (option: {
    instance: AbstractConfig<any>;
    value: any;
    metricConfigRecord: Record<string, any>;
}) => Promise<void>;

/** 默认校验器，不做额外校验。 */
export const DEFAULT_VALIDATOR: ConfigValidator = () => Promise.resolve();

/** 配置项基类，统一约束展示信息、默认值、解析和序列化能力。 */
export abstract class AbstractConfig<T = ConfigValueType> {
    constructor(
        public label: string,
        public desc: string,
        public defaultValue: T,
        public validator: ConfigValidator = DEFAULT_VALIDATOR,
    ) {}
    abstract parse(v: string): T;
    abstract stringify(v: T): string;
    abstract type: string;

    /** 合并多个来源的配置值；默认取第一个值，缺省时回落到默认值。 */
    merge(...list: T[]): T {
        return list?.[0] ?? this.defaultValue;
    }
}

/** 布尔配置项，字符串 true/false 会被解析为布尔值。 */
export class BooleanConfig extends AbstractConfig<boolean> {
    static assert(v: AbstractConfig<boolean>): v is BooleanConfig {
        return v.type === 'boolean';
    }
    type = 'boolean';
    parse(v: string): boolean {
        if (v === 'true') return true;
        if (v === 'false') return false;
        return this.defaultValue;
    }
    stringify(v: boolean): string {
        return v.toString();
    }
    merge(...list: boolean[]): boolean {
        return list.some(Boolean);
    }
}

/** 字符串配置项，原样解析和序列化。 */
export class StringConfig extends AbstractConfig<string> {
    static assert(v: AbstractConfig<string>): v is StringConfig {
        return v.type === 'string';
    }
    type = 'string';
    parse(v: string): string {
        return v;
    }
    stringify(v: string): string {
        return v;
    }
}

/** 单选配置项，只接受 options 中声明过的值。 */
export class RadioConfig<T extends string = ''> extends AbstractConfig<T> {
    static assert(v: AbstractConfig<string>): v is RadioConfig<any> {
        return v.type === 'radio';
    }
    type = 'radio';
    config: {
        options: {
            label: string;
            value: T;
        }[];
    };
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<T>['defaultValue'],
        config: RadioConfig<T>['config'],
    );
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<T>['defaultValue'],
        validator: ConfigValidator,
        config: RadioConfig<T>['config'],
    );
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<T>['defaultValue'],
        configOrValidator: RadioConfig<T>['config'] | ConfigValidator,
        config?: RadioConfig<T>['config'],
    ) {
        const hasValidator = typeof configOrValidator === 'function';
        super(label, desc, defaultValue, hasValidator ? configOrValidator : DEFAULT_VALIDATOR);
        this.config = hasValidator ? config! : configOrValidator;
    }
    parse(v: string): T {
        const val = v as T;
        if (this.config.options.every((v) => v.value !== val)) return this.defaultValue;
        return val;
    }
    stringify(v: T): string {
        return v;
    }
}

/** 数字配置项，支持记录最小值、最大值和小数位数元信息。 */
export class NumberConfig extends AbstractConfig<number> {
    static assert(v: AbstractConfig<number>): v is NumberConfig {
        return v.type === 'number';
    }
    type = 'number';
    min: number | undefined;
    max: number | undefined;
    decimals: number | undefined;
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<number>['defaultValue'],
        min: number | undefined,
        max: number | undefined,
        decimals: number | undefined,
    );
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<number>['defaultValue'],
        validator: ConfigValidator,
        min: number | undefined,
        max: number | undefined,
        decimals: number | undefined,
    );
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<number>['defaultValue'],
        minOrValidator: number | undefined | ConfigValidator,
        maxOrMin: number | undefined,
        decimalsOrMax: number | undefined,
        decimals?: number | undefined,
    ) {
        const hasValidator = typeof minOrValidator === 'function';
        super(label, desc, defaultValue, hasValidator ? minOrValidator : DEFAULT_VALIDATOR);
        this.min = hasValidator ? maxOrMin : minOrValidator;
        this.max = hasValidator ? decimalsOrMax : maxOrMin;
        this.decimals = hasValidator ? decimals : decimalsOrMax;
    }
    parse(v: string): number {
        const num = Number(v);
        if (Number.isNaN(num)) return this.defaultValue;
        return num;
    }
    stringify(v: number): string {
        return v.toString();
    }
}

/** 字符串列表配置项，通过 separator 在字符串和数组之间转换。 */
export class StringListConfig extends AbstractConfig<string[]> {
    static assert(v: AbstractConfig<string[]>): v is StringListConfig {
        return v.type === 'string-list';
    }
    separator: string;
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<string[]>['defaultValue'],
        separator: string,
    );
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<string[]>['defaultValue'],
        validator: ConfigValidator,
        separator: string,
    );
    constructor(
        label: AbstractConfig<number>['label'],
        desc: AbstractConfig<number>['desc'],
        defaultValue: AbstractConfig<string[]>['defaultValue'],
        separatorOrValidator: string | ConfigValidator,
        separator?: string,
    ) {
        const hasValidator = typeof separatorOrValidator === 'function';
        super(label, desc, defaultValue, hasValidator ? separatorOrValidator : DEFAULT_VALIDATOR);
        this.separator = hasValidator ? separator! : separatorOrValidator;
    }
    type = 'string-list';
    parse(v: string): string[] {
        return v.split(this.separator).filter(Boolean);
    }
    stringify(v: string[]): string {
        return v.join(this.separator);
    }
}

/** 多列字符串列表配置的列描述。 */
export type MultItem = {
    label: string;
    key: string;
    width: number;
    value?: string | number;
    placeholder?: string;
};

/** 多列字符串列表中的一行数据。 */
export type MultRow = Record<string, string | number>;

/** 多列字符串列表配置项，用 JSON 行和 separator 表达结构化列表。 */
export class MultipleStringListConfig extends AbstractConfig<MultRow[]> {
    static assert(v: AbstractConfig<any>): v is MultipleStringListConfig {
        return v.type === 'mult-string-list';
    }

    type = 'mult-string-list';
    separator: string;
    config: MultItem[];

    constructor(
        label: AbstractConfig<MultRow[]>['label'],
        desc: AbstractConfig<MultRow[]>['desc'],
        defaultValue: AbstractConfig<MultRow[]>['defaultValue'],
        separator: string,
        config: MultItem[],
    );
    constructor(
        label: AbstractConfig<MultRow[]>['label'],
        desc: AbstractConfig<MultRow[]>['desc'],
        defaultValue: AbstractConfig<MultRow[]>['defaultValue'],
        validator: ConfigValidator,
        separator: string,
        config: MultItem[],
    );
    constructor(
        label: AbstractConfig<MultRow[]>['label'],
        desc: AbstractConfig<MultRow[]>['desc'],
        defaultValue: AbstractConfig<MultRow[]>['defaultValue'],
        separatorOrValidator: string | ConfigValidator,
        separatorOrConfig: string | MultItem[],
        config?: MultItem[],
    ) {
        const hasValidator = typeof separatorOrValidator === 'function';
        super(label, desc, defaultValue, hasValidator ? separatorOrValidator : DEFAULT_VALIDATOR);
        this.separator = hasValidator ? (separatorOrConfig as string) : separatorOrValidator;
        this.config = hasValidator ? config! : (separatorOrConfig as MultItem[]);
    }

    parse(v: string): MultRow[] {
        if (!v) return [];

        return v
            .split(this.separator)
            .filter(Boolean)
            .map((item) => {
                let parsed: unknown;
                try {
                    parsed = JSON.parse(item);
                } catch {
                    parsed = undefined;
                }

                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    const obj: MultRow = {};
                    this.config?.forEach((c) => {
                        obj[c.key] = (parsed as Record<string, string | number>)[c.key] ?? '';
                    });
                    return obj;
                }

                if (!this.config?.length) return {};
                const obj: MultRow = {};
                const lastKey = this.config[this.config.length - 1].key;
                this.config.forEach((c) => {
                    obj[c.key] = c.key === lastKey ? item.replace(/^"|"$/g, '') : '';
                });
                return obj;
            });
    }

    stringify(v: MultRow[]) {
        return v.map((i) => JSON.stringify(i)).join(this.separator);
    }
}

/** 8 位十六进制 RGBA 颜色配置项，格式为 #RRGGBBAA。 */
export class HexaColorConfig extends StringConfig {
    static assert(v: AbstractConfig<any>): v is HexaColorConfig {
        return v.type === 'hexa-color';
    }
    static isValidNumber(num: string | number) {
        if (typeof num === 'string') num = parseInt(num, 16);
        return num >= 0 && num < 256;
    }
    static validate(color: string) {
        return (
            color.length === 9 &&
            color[0] === '#' &&
            this.isValidNumber(color.substring(1, 3)) &&
            this.isValidNumber(color.substring(3, 5)) &&
            this.isValidNumber(color.substring(5, 7)) &&
            this.isValidNumber(color.substring(7, 9))
        );
    }
    static parse(color: string) {
        if (!this.validate(color)) return null;
        const red = Number(color.substring(1, 3));
        const green = Number(color.substring(3, 5));
        const blue = Number(color.substring(5, 7));
        const alpha = Number(color.substring(7, 9));
        return { red, green, blue, alpha };
    }
    type = 'hexa-color';
    parse(v: string): string {
        return HexaColorConfig.validate(v) ? v : this.defaultValue;
    }
}

/** CSV 配置项，keys 描述 CSV 列含义。 */
export class CsvConfig extends StringConfig {
    static assert(v: AbstractConfig<any>): v is CsvConfig {
        return v.type === 'csv';
    }
    keys: string[];
    constructor(
        label: AbstractConfig<string>['label'],
        desc: AbstractConfig<string>['desc'],
        defaultValue: AbstractConfig<string>['defaultValue'],
        keys: string[],
    );
    constructor(
        label: AbstractConfig<string>['label'],
        desc: AbstractConfig<string>['desc'],
        defaultValue: AbstractConfig<string>['defaultValue'],
        validator: ConfigValidator,
        keys: string[],
    );
    constructor(
        label: AbstractConfig<string>['label'],
        desc: AbstractConfig<string>['desc'],
        defaultValue: AbstractConfig<string>['defaultValue'],
        keysOrValidator: string[] | ConfigValidator,
        keys?: string[],
    ) {
        const hasValidator = typeof keysOrValidator === 'function';
        super(label, desc, defaultValue, hasValidator ? keysOrValidator : DEFAULT_VALIDATOR);
        this.keys = hasValidator ? keys! : keysOrValidator;
    }
    type = 'csv';
}

/** 从配置项实例中提取实际值类型。 */
export type ExtractConfigType<C extends AbstractConfig<any>> =
    C extends AbstractConfig<infer R> ? R : never;

/** 所有内置配置项支持的值类型。 */
export type ConfigValueType =
    | ExtractConfigType<StringConfig>
    | ExtractConfigType<BooleanConfig>
    | ExtractConfigType<NumberConfig>
    | ExtractConfigType<StringListConfig>
    | ExtractConfigType<RadioConfig>
    | ExtractConfigType<MultipleStringListConfig>
    | ExtractConfigType<HexaColorConfig>
    | ExtractConfigType<CsvConfig>;

/** 内置配置项工厂集合，便于动态创建配置实例。 */
export const commonFactory = {
    StringConfig,
    BooleanConfig,
    NumberConfig,
    StringListConfig,
    RadioConfig,
    MultipleStringListConfig,
    HexaColorConfig,
    CsvConfig,
} as const;

export type ConfigFactory = typeof commonFactory;

/** 将一组配置项定义转换成对应的配置值类型映射。 */
export type ExtractConfigInfo<O extends Record<string, AbstractConfig<any>>> = {
    [K in keyof O]: ExtractConfigType<O[K]>;
};

export type ConfigType = 'scene' | 'project' | 'global' | 'metric_system';

/** 构建配置 key 前缀，格式为 type@typeId。 */
export function buildConfigKeyPrefix(type: string, typeId: string) {
    return `${type}${TYPE_SEPARATOR}${typeId}`;
}

/** 构建完整配置 key，格式为 type@typeId:configName。 */
export function buildConfigKey(type: string, typeId: string, configName: string) {
    return `${buildConfigKeyPrefix(type, typeId)}${CONFIG_KEY_SEPARATOR}${configName}`;
}

/** 从完整配置 key 中提取 configName。 */
export function extractConfigName(configKey: string) {
    const separatorIndex = configKey.indexOf(CONFIG_KEY_SEPARATOR);
    if (separatorIndex < 0) return '';
    return configKey.slice(separatorIndex + CONFIG_KEY_SEPARATOR.length);
}

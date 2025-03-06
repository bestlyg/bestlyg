import { fromError } from 'zod-validation-error';
import { z, ZodObject } from 'zod';
import { produce } from 'immer';

export const zodSchemaSymbol = Symbol('zod-schema');

export type InstanceOfZodModel<T extends ZodObject<any> = ZodObject<any>> = z.infer<T> &
    BaseZodModel<T>;

export interface ZodModelConstructor<T extends ZodObject<any> = ZodObject<any>> {
    new (raw?: z.infer<T>, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>;
    [zodSchemaSymbol]: T;
    from(raw?: z.infer<T>, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>;
    isZodModel: true;
}

export interface ZodModelConfig {}

export abstract class BaseZodModel<T extends ZodObject<any> = ZodObject<any>> {
    static isZodModel = true as const;
    #parsedResult: ReturnType<T['safeParse']>;
    #cstr: ZodModelConstructor<T>;
    #schema: T;
    #raw: z.infer<T> = {};
    #config: ZodModelConfig = {};
    constructor(
        cstr: ZodModelConstructor<T>,
        schema: T,
        raw: z.infer<T> = {},
        config: ZodModelConfig = {},
    ) {
        this.#cstr = cstr;
        this.#schema = schema;
        this.#raw = raw;
        this.#config = config;
        this.#parsedResult = this.#schema.safeParse(this.#raw) as ReturnType<T['safeParse']>;
        if (this.#parsedResult.success) {
            Object.assign(this, this.#parsedResult.data);
            Object.defineProperties(
                this,
                Object.keys(this.#parsedResult.data).reduce(
                    (o, key) => {
                        o[key] = {
                            get: () => this.getData()[key],
                            configurable: false,
                            enumerable: true,
                        };
                        return o;
                    },
                    {} as Parameters<typeof Object.defineProperties>[1],
                ),
            );
        }
    }
    assertSuccess() {
        if (!this.#parsedResult.success) throw Error('Zod assert success fail.', { cause: this });
        return this;
    }
    assertFailure() {
        if (this.#parsedResult.success) throw Error('Zod assert failure fail.', { cause: this });
        return this;
    }
    clone(): InstanceOfZodModel<T> {
        return this.#cstr.from(this.getData());
    }
    cloneWith(recipe: (draft: z.infer<T>) => void): InstanceOfZodModel<T> {
        const newData = produce(this.getData(), recipe);
        return this.#cstr.from(newData);
    }
    toJSON() {
        return JSON.stringify(this.getData());
    }
    getParsedResult() {
        return this.#parsedResult;
    }
    getData() {
        return this.assertSuccess().getParsedResult().data as InstanceOfZodModel<T>;
    }
    getErrorMessage() {
        return fromError(this.assertFailure().getParsedResult().error!).toString();
    }
    getCstr() {
        return this.#cstr;
    }
    getConfig() {
        return this.#config;
    }
    getRaw() {
        return this.#raw;
    }
    getSchema() {
        return this.#schema;
    }
}

export function createZodModel<T extends ZodObject<any> = ZodObject<any>>(
    schema: T,
): ZodModelConstructor<T> {
    class ZodModel extends BaseZodModel<T> {
        static [zodSchemaSymbol] = schema;
        static from(...args: ConstructorParameters<typeof ZodModel>) {
            return new ZodModel(...args);
        }
        constructor(raw?: z.infer<T>, modelConfig?: ZodModelConfig) {
            super(ZodModel, schema, raw, modelConfig);
        }
    }
    return ZodModel;
}

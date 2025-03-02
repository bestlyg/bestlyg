import { z, ZodError, ZodObject, ZodRawShape } from 'zod';
import { produce } from 'immer';

export const zodSchemaSymbol = Symbol('zod-schema');

export function zodErrorToMessage(error: ZodError<any>) {
    return error.errors
        .map(error => `${error.path.join('.')} is ${error.message.toLowerCase()}`)
        .join(', ');
}

export type InstanceOfZodModel<T extends ZodObject<any> = ZodObject<any>> = z.infer<T> &
    BaseZodModel<T>;

export interface ZodModelConstructor<T extends ZodObject<any> = ZodObject<any>> {
    new (raw?: unknown, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>;
    [zodSchemaSymbol]: T;
    from(raw?: unknown, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>;
    isZodModel: true;
}

export interface ZodModelConfig {}

export abstract class BaseZodModel<T extends ZodObject<any> = ZodObject<any>> {
    static isZodModel: true = true;
    protected _parsedResult: ReturnType<T['safeParse']>;
    constructor(
        protected _cstr: ZodModelConstructor<T>,
        protected _schema: T,
        protected _raw: unknown = {},
        protected _config: ZodModelConfig = {},
    ) {
        this._parsedResult = this._schema.safeParse(_raw) as ReturnType<T['safeParse']>;
        if (this._parsedResult.success) {
            Object.assign(this, this._parsedResult.data);
            Object.defineProperties(
                this,
                Object.keys(this._parsedResult.data).reduce(
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
        if (!this._parsedResult.success) throw Error(zodErrorToMessage(this._parsedResult.error));
        return this;
    }
    clone(): InstanceOfZodModel<T> {
        return this._cstr.from(this.getData());
    }
    cloneWith(recipe: (draft: z.infer<T>) => void): InstanceOfZodModel<T> {
        const newData = produce(this.getData(), recipe);
        return this._cstr.from(newData);
    }
    toJSON() {
        return JSON.stringify(this.getData());
    }
    getParsedResult() {
        return this._parsedResult;
    }
    getData() {
        return this.assertSuccess().getParsedResult().data as InstanceOfZodModel<T>;
    }
    getCstr() {
        return this._cstr;
    }
    getConfig() {
        return this._config;
    }
    getRaw() {
        return this._raw;
    }
    getSchema() {
        return this._schema;
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
        constructor(raw?: unknown, modelConfig?: ZodModelConfig) {
            super(ZodModel, schema, raw, modelConfig);
        }
    }
    return ZodModel;
}

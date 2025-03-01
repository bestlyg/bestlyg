import { z, ZodError, ZodType } from 'zod';

export const zodSchemaSymbol = Symbol('zod-schema');

export function zodErrorToMessage(error: ZodError<any>) {
    return error.errors
        .map(error => `${error.path.join('.')} is ${error.message.toLowerCase()}`)
        .join(', ');
}

export type InstanceOfZodModel<T extends ZodType = ZodType> = z.infer<T> & BaseZodModel<T>;

export interface ZodModelConstructor<T extends ZodType = ZodType> {
    new (obj?: unknown, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>;
    [zodSchemaSymbol]: T;
    from(obj?: unknown, modelConfig?: ZodModelConfig): InstanceOfZodModel<T>;
    isZodModel: true;
}

export interface ZodModelConfig {}

export abstract class BaseZodModel<T extends ZodType = ZodType> {
    static isZodModel: true = true;
    protected _parsedResult: ReturnType<T['safeParse']>;
    constructor(
        protected _cstr: ZodModelConstructor<T>,
        protected _schema: T,
        protected _obj: unknown = {},
        protected _config: ZodModelConfig = {},
    ) {
        this._parsedResult = this._schema.safeParse(_obj) as ReturnType<T['safeParse']>;
        if (this._parsedResult.success) {
            Object.assign(this, this._parsedResult.data);
        }
    }
    assertSuccess() {
        if (!this._parsedResult.success) throw Error(zodErrorToMessage(this._parsedResult.error));
        return this;
    }
    clone(): InstanceOfZodModel<T> {
        return new this._cstr(this.getData());
    }
    toJSON() {
        return JSON.stringify(this.getData());
    }
    getParsedResult() {
        return this._parsedResult;
    }
    getData(): InstanceOfZodModel<T> {
        return this.assertSuccess().getParsedResult().data;
    }
    getCstr() {
        return this._cstr;
    }
    getConfig() {
        return this._config;
    }
    getObj() {
        return this._obj;
    }
    getSchema() {
        return this._schema;
    }
}

export function createZodModel<T extends ZodType = ZodType>(schema: T): ZodModelConstructor<T> {
    class ZodModel extends BaseZodModel<T> {
        static [zodSchemaSymbol] = schema;
        static from(obj?: unknown) {
            return new ZodModel(obj);
        }
        constructor(obj?: unknown) {
            super(ZodModel, schema, obj);
        }
    }
    return ZodModel;
}

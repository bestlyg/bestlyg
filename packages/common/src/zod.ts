import { fromError } from 'zod-validation-error';
import { z, ZodObject } from 'zod';
import { produce } from 'immer';
import { BaseModel } from './base-model';
import EventEmitter from 'eventemitter3';

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

export abstract class BaseZodModel<
    T extends ZodObject<any> = ZodObject<any>,
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
> extends BaseModel<EventTypes, Context> {
    static isZodModel = true as const;
    private _parsedResult!: ReturnType<T['safeParse']>;
    constructor(
        private _cstr: ZodModelConstructor<T>,
        private _schema: T,
        private _raw: z.infer<T> = {},
        private _config: ZodModelConfig = {},
    ) {
        super();
        this.parse(this._raw);
    }
    parse(raw: z.infer<T> = {}) {
        this._raw = raw;
        this._parsedResult = this._schema.safeParse(this._raw) as ReturnType<T['safeParse']>;
        if (this.isParsedSuccess()) {
            for (const key of Object.keys(this)) {
                Reflect.deleteProperty(this, key);
            }
            Object.assign(this, this.getData());
        }
    }
    isParsedSuccess() {
        return this._parsedResult.success;
    }
    assertSuccess() {
        if (!this.isParsedSuccess()) throw Error('Zod assert success fail.', { cause: this });
        return this;
    }
    assertFailure() {
        if (this.isParsedSuccess()) throw Error('Zod assert failure fail.', { cause: this });
        return this;
    }
    clone() {
        return this._cstr.from(this.getData());
    }
    cloneWith(recipe: (draft: z.infer<T>) => void) {
        const newData = produce(this.getData(), recipe);
        return this._cstr.from(newData);
    }
    setDataWith(recipe: (draft: z.infer<T>) => void) {
        const newData = produce(this.getData(), recipe);
        this.parse(newData);
        return this;
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
    getErrorMessage() {
        return fromError(this.assertFailure().getParsedResult().error!).toString();
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
        constructor(raw?: z.infer<T>, modelConfig?: ZodModelConfig) {
            super(ZodModel, schema, raw, modelConfig);
        }
    }
    return ZodModel;
}

export interface ZodBaseModel<
    T extends z.ZodObject<any> = z.ZodObject<any>,
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
> {
    new (): z.infer<T> & BaseModel<EventTypes, Context>;
}

export function createZodBaseModel<
    T extends z.ZodObject<any> = z.ZodObject<any>,
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
>(schema: T) {
    function ZodBaseModel(raw: any) {
        const res = schema.safeParse(raw);
        if (!res.success) throw new Error(fromError(res.error).toString());
        return res;
    }
    Object.setPrototypeOf(ZodBaseModel, new BaseModel());
    return ZodBaseModel as any as ZodBaseModel<T, EventTypes, Context>;
}

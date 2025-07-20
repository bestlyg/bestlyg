import { fromError } from 'zod-validation-error/v4';
import { z } from 'zod';
import { BaseModel } from './base-model';
import EventEmitter from 'eventemitter3';

export const zodSchemaSymbol = Symbol('zod-schema');

export interface ZodBaseModel<
    T extends z.ZodObject<any> = z.ZodObject<any>,
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
> {
    new (raw?: any): z.infer<T> &
        BaseModel<EventTypes, Context> & {
            __raw__: any;
            getRaw(): any;
            __plain__: z.infer<T>;
            getPlain(): z.infer<T>;
            __schema__: T;
            getSchema(): T;
            __config__: ZodBaseModelConfig;
            getConfig(): ZodBaseModelConfig;
        };
    [zodSchemaSymbol]: T;
}

interface ZodBaseModelConfig {}

export function createZodBaseModel<
    T extends z.ZodObject<any> = z.ZodObject<any>,
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends any = any,
>(schema: T, config: ZodBaseModelConfig = {}) {
    function ZodBaseModel(raw: any) {
        const res = schema.safeParse(raw);
        if (!res.success) {
            throw new TypeError(fromError(res.error).toString(), { cause: { raw, schema } });
        }
        const plain = res.data;
        const instance = Object.assign({}, plain, {
            __raw__: raw,
            getRaw() {
                return this.__raw__;
            },
            __plain__: plain,
            getPlain() {
                return this.__plain__;
            },
            __schema__: schema,
            getSchema() {
                return this.__schema__;
            },
            __config__: config,
            getConfig() {
                return this.__config__;
            },
        });
        Object.setPrototypeOf(instance, new BaseModel());
        return instance;
    }
    ZodBaseModel[zodSchemaSymbol] = schema;
    return ZodBaseModel as unknown as ZodBaseModel<T, EventTypes, Context>;
}

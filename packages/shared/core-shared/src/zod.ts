import { z } from 'zod';

export const zodSchemaSymbol = Symbol('zod-schema');

export function isZodModel(o: unknown): o is ZodBaseModel {
    if (!o) return false;
    return (o as any)[zodSchemaSymbol];
}

export interface ZodBaseModel<T extends z.ZodObject<any> = z.ZodObject<any>> {
    new (raw?: any): z.infer<T> & {
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
    getSchema(): T;
}

interface ZodBaseModelConfig {}

export function createZodBaseModel<T extends z.ZodObject<any> = z.ZodObject<any>>(
    schema: T,
    config: ZodBaseModelConfig = {},
) {
    function ZodBaseModel(raw: any) {
        const res = schema.safeParse(raw);
        if (!res.success) {
            throw new TypeError(z.prettifyError(res.error), { cause: { raw, schema } });
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
        return instance;
    }
    ZodBaseModel.getSchema = function (this) {
        return schema;
    };
    ZodBaseModel[zodSchemaSymbol] = schema;
    return ZodBaseModel as unknown as ZodBaseModel<T>;
}

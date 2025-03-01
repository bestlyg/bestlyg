import { z, ZodType } from 'zod';
import { zodSchemaSymbol } from './zod-schema-symbol';

export type ZodDto<T extends ZodType = ZodType> = {
    new (object?: unknown): z.infer<T>;
    [zodSchemaSymbol]: T;
};

abstract class Base<T extends ZodType = ZodType> {
    protected schema: T;
    // protected parseResult: ReturnType<T['safeParse']>;
    constructor(schema: T, object?: unknown) {
        this.schema = schema;
        // this.parseResult = schema.safeParse(object);
        // if (this.parseResult.success) {
        //     Object.assign(this, this.parseResult.data);
        // }
    }
    // unwrap(): z.infer<T> | null {
    //     if (this.parseResult.success) {
    //         return this.parseResult.data;
    //     } else {
    //         return null;
    //     }
    // }
}

export function createZodDto<T extends ZodType = ZodType>(schema: T): ZodDto<T> {
    return class extends Base {
        static [zodSchemaSymbol] = schema;
    };
}

export const SelectLedgerPageSchema = z.object({
    date: z.string().date().optional(),
});

export class SelectLedgerPageDto extends createZodDto(SelectLedgerPageSchema) {}

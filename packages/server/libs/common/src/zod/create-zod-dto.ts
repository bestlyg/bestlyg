import { ZodType } from 'zod';
import { ZodDto } from './zod-dto';
import { zodSchemaSymbol } from './zod-schema-symbol';

export function createZodDto<T extends ZodType = ZodType>(schema: T): ZodDto<T> {
    return class {
        static [zodSchemaSymbol] = schema;
    };
}
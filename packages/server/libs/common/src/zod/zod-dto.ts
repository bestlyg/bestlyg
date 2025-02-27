import { ZodType, z } from 'zod';
import { zodSchemaSymbol } from './zod-schema-symbol';

export type ZodDto<T extends ZodType = ZodType> = {
    new (): z.infer<T>;
    [zodSchemaSymbol]: T;
};

import { z, ZodType } from 'zod';
import { zodSchemaSymbol } from './zod-schema-symbol';
import { ZodDto } from './zod-dto';

export function createZodDto<T extends ZodType = ZodType>(schema: T): ZodDto<T> {
    return class {
        static [zodSchemaSymbol] = schema;
        private parseResult: ReturnType<typeof schema.safeParse>;
        constructor(object?: unknown) {
            this.parseResult = schema.safeParse(object);
            if (this.parseResult.success) {
                Object.assign(this, this.parseResult.data);
            }
        }
        unwrap(): z.infer<T> | null {
            if (this.parseResult.success) {
                return this.parseResult.data;
            } else {
                return null;
            }
        }
    };
}

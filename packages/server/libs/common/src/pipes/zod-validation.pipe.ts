import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    UnprocessableEntityException,
} from '@nestjs/common';
import { ZodType } from 'zod';

export const ZOD_SCHEMA = Symbol('zodSchema');

export abstract class ZodDto {
    static [ZOD_SCHEMA]: ZodType;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    public transform(value: unknown, metadata: ArgumentMetadata): unknown {
        const zodSchema: ZodType = (metadata?.metatype as any)?.[ZOD_SCHEMA];
        if (zodSchema) {
            const parseResult = zodSchema.safeParse(value);

            if (!parseResult.success) {
                const message = parseResult.error.errors
                    .map(error => `${error.path.join('.')} is ${error.message.toLowerCase()}`)
                    .join(', ');

                throw new UnprocessableEntityException(`Input validation failed: ${message}`);
            }

            return parseResult.data;
        }

        return value;
    }
}

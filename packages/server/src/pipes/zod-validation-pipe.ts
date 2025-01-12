import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    UnprocessableEntityException,
} from '@nestjs/common';
import { ZodType } from 'zod';

export abstract class ZodDto {
    static zodSchema: ZodType;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    public transform(value: unknown, metadata: ArgumentMetadata): unknown {
        const zodSchema = (metadata?.metatype as any)?.zodSchema;
        if (zodSchema) {
            const parseResult = zodSchema.safeParse(value);

            if (!parseResult.success) {
                const { error } = parseResult;
                const message = error.errors
                    .map(error => `${error.path.join('.')}: ${error.message}`)
                    .join(', ');

                throw new UnprocessableEntityException(`Input validation failed: ${message}`);
            }

            return parseResult.data;
        }

        return value;
    }
}

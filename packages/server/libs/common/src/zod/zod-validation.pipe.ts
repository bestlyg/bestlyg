import {
    PipeTransform,
    Injectable,
    BadRequestException,
    ArgumentMetadata,
    Logger,
} from '@nestjs/common';
import { ZodDto } from './zod-dto';
import { zodSchemaSymbol } from './zod-schema-symbol';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    private readonly logger = new Logger(ZodValidationPipe.name);

    transform(value: unknown, metadata: ArgumentMetadata) {
        const schema = (metadata?.metatype as ZodDto)?.[zodSchemaSymbol];
        if (schema) {
            const parseResult = schema.safeParse(value);
            if (!parseResult.success) {
                const message = parseResult.error.errors
                    .map(error => `${error.path.join('.')} is ${error.message.toLowerCase()}`)
                    .join(', ');
                throw new BadRequestException(`Validation failed: ${message}`);
            }
            return parseResult.data;
        }
    }
}

import {
    PipeTransform,
    Injectable,
    BadRequestException,
    ArgumentMetadata,
    Logger,
} from '@nestjs/common';
import { ZodDto, zodSchemaSymbol, zodErrorToMessage } from '@bestlyg/common';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    private readonly logger = new Logger(ZodValidationPipe.name);

    transform(value: unknown, metadata: ArgumentMetadata) {
        const schema = (metadata?.metatype as ZodDto)?.[zodSchemaSymbol];
        if (schema) {
            const parseResult = schema.safeParse(value);
            if (!parseResult.success) {
                const message = zodErrorToMessage(parseResult.error);
                throw new BadRequestException(`Validation failed: ${message}`);
            }
            return parseResult.data;
        }
    }
}

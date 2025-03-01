import {
    PipeTransform,
    Injectable,
    BadRequestException,
    ArgumentMetadata,
    Logger,
} from '@nestjs/common';
import { ZodModelConstructor, zodErrorToMessage } from '@bestlyg/common';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    private readonly logger = new Logger(ZodValidationPipe.name);

    transform(value: unknown, metadata: ArgumentMetadata) {
        const cstr = metadata?.metatype as ZodModelConstructor;
        if (cstr && cstr.isZodDto) {
            const dto = cstr.from(value);
            const parseResult = dto.getParsedResult();
            if (!parseResult.success) {
                const message = zodErrorToMessage(parseResult.error);
                throw new BadRequestException(`Validation failed: ${message}`);
            }
            return dto;
        }
    }
}

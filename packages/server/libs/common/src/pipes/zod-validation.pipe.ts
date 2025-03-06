import {
    PipeTransform,
    Injectable,
    BadRequestException,
    ArgumentMetadata,
    Logger,
} from '@nestjs/common';
import { ZodModelConstructor } from '@bestlyg/common';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    private readonly logger = new Logger(ZodValidationPipe.name);

    transform(value: unknown, metadata: ArgumentMetadata): any {
        const cstr = metadata?.metatype as ZodModelConstructor;
        if (cstr && cstr.isZodModel) {
            const dto = cstr.from(value);
            const parseResult = dto.getParsedResult();
            if (!parseResult.success) {
                throw new BadRequestException(dto.getErrorMessage());
            }
            return dto;
        }
    }
}

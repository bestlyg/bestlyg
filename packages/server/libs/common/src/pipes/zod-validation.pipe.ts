import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodType) {}

    transform(value: any) {
        const parseResult = this.schema.safeParse(value);

        if (!parseResult.success) {
            const message = parseResult.error.errors
                .map(error => `${error.path.join('.')} is ${error.message.toLowerCase()}`)
                .join(', ');

            throw new BadRequestException(`Validation failed: ${message}`);
        }

        return parseResult.data;
    }
}

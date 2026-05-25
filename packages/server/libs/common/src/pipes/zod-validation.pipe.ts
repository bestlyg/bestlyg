import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isZodModel } from '@bestlyg/server-shared';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const cstr = metadata?.metatype as any;
        if (isZodModel(cstr)) {
            try {
                return new cstr(value) as any;
            } catch (error) {
                throw new BadRequestException((error as any)?.message ?? '参数校验失败');
            }
        }
        return value;
    }
}

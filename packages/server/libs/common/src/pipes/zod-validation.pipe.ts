import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common'
import { ZodModelConstructor } from '@bestlyg/common'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const cstr = metadata?.metatype as ZodModelConstructor
    if (cstr && cstr.isZodModel) {
      const dto = cstr.from(value)
      if (!dto.isParsedSuccess()) {
        throw new BadRequestException(dto.getErrorMessage())
      }
      return dto
    }
  }
}

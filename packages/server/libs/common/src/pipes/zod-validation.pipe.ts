import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common'
import { ZodModelConstructor , zodSchemaSymbol} from '@bestlyg/common'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const cstr = metadata?.metatype as ZodModelConstructor
    console.log(cstr)
    if (cstr?.[zodSchemaSymbol]) {
      return new cstr(value)
    }
  }
}

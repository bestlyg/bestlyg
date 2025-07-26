import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { zodSchemaSymbol , isZodModel} from '@bestlyg/common';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const cstr = metadata?.metatype as any;
        if (isZodModel(cstr)) {
            return new cstr(value) as any;
        }
    }
}

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { zodSchemaSymbol } from '@bestlyg/common';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const cstr = metadata?.metatype as any;
        console.log('==>1',cstr, cstr?.[zodSchemaSymbol])
        if (cstr?.[zodSchemaSymbol]) {
            return new cstr(value) as any;
        }
    }
}

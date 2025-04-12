import { z } from 'zod';
import { createZodModel, zodSchemaSymbol, createZodBaseModel } from '@/zod';
import { PageParam } from '@/page-param';

// export class SelectLedgerPageDto extends createZodModel(
//     z
//         .object({
//             date: z.string().date().optional(),
//         })
//         .merge(PageParam.Schema),
// ) {}

export class SelectLedgerPageDto extends createZodBaseModel(
    z
        .object({
            date: z.string().date().optional(),
        })
        .merge(PageParam.Schema),
) {
    a = () => {
        console.log(this.getPlain());
    };
    __a__ = 1;
}

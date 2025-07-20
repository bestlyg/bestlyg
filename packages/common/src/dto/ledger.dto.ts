import { z } from 'zod';
import { createZodBaseModel } from '@/zod';
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
            date: z.iso.date().optional(),
        })
        .extend(PageParam.Schema.shape),
) {}

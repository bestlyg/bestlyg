import { z } from 'zod';
import { createZodModel } from '@/zod';
import { PageParam } from '@/page-param';

export class SelectLedgerPageDto extends createZodModel(
    z
        .object({
            date: z.string().date().optional(),
        })
        .merge(PageParam.Schema)
        .readonly(),
) {}

import { z } from 'zod';
import { PageParam } from '@bestlyg/common';

export const SelectLedgerPageSchema = z.object({
    ...PageParam.Schema.shape,
    ...z.object({
        date: z.string().date().optional(),
    }).shape,
});
export type SelectLedgerPageDto = z.infer<typeof SelectLedgerPageSchema>;

import { z } from 'zod';
import { createZodDto } from '@/zod';
import { PageParam } from '@/page-param';

export const SelectLedgerPageSchema = z
    .object({
        date: z.string().date().optional(),
    })
    .merge(PageParam.Schema);

export class SelectLedgerPageDto extends createZodDto(SelectLedgerPageSchema) {}

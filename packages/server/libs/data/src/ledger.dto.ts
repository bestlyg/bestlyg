import { z } from 'zod';
import { PageParam } from '@bestlyg/common';
import { createZodDto } from '@bestlyg-server/common';

export const SelectLedgerPageSchema = z
    .object({
        date: z.string().date().optional(),
    })
    .merge(PageParam.Schema);

export class SelectLedgerPageDto extends createZodDto(SelectLedgerPageSchema) {}

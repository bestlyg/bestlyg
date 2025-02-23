import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const SelectLedgerPageSchema = z
    .object({
        current: z.coerce.number().readonly(),
        pageSize: z.coerce.number().readonly(),
        date: z.string().date().optional(),
    })
    .openapi({
        title: '分页账本',
        description: '获取用户分页账本',
    })

export class SelectLedgerPageDto extends createZodDto(SelectLedgerPageSchema) {}

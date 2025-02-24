import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { PageParam } from '@bestlyg/common';
import { extendApi } from '@anatine/zod-openapi';

// export const SelectLedgerPageSchema = extendApi(
//     z
//         .object({
//             date: z.string().date().optional(),
//         })
//         .merge(PageParam.Schema),
//     {
//         title: '分页账本',
//         description: '获取用户分页账本',
//     },
// );

export const SelectLedgerPageSchema = z
    .object({
        date: z.string().date().optional(),
    })
    .merge(PageParam.Schema)
    .openapi({
        title: '分页账本',
        description: '获取用户分页账本',
    });

export class SelectLedgerPageDto extends createZodDto(SelectLedgerPageSchema) {}

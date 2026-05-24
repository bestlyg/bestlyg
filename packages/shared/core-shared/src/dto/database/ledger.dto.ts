import { createZodModel } from '../../zod';
import { z } from 'zod';
import { PageData } from '../../page-data';
import { PageParam } from '../../page-param';
import {
    DatabaseWriteResponseDto,
    dateValueSchema,
    EntityBaseResponseDto,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseDto,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseDto,
    DatabaseXlsxImportResponseDto,
} from './xlsx.dto';
import { ledgerFromValues, ledgerTypeValues } from './enums';

export class LedgerQueryRequestDto extends createZodModel(
    z
        .object({
            date: z.string().min(1).optional(),
        })
        .strip(),
) {}

export class LedgerPageRequestDto extends createZodModel(
    LedgerQueryRequestDto.getSchema().extend(PageParam.fields).strip(),
) {}

export class LedgerExportRequestDto extends createZodModel(LedgerQueryRequestDto.getSchema()) {}

export class LedgerCreateRequestDto extends createZodModel(
    z
        .object({
            date: z.coerce.date(),
            balance: z.coerce.number().int(),
            comment: z.coerce.string().trim().min(1),
            io: z.stringbool(),
            from: z.enum(ledgerFromValues).optional().nullable(),
            bank: z.coerce.string().optional().nullable(),
            type: z.enum(ledgerTypeValues),
        })
        .strict(),
) {}

export class LedgerUpdateRequestDto extends createZodModel(
    LedgerCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class LedgerBatchCreateRequestDto extends createZodModel(
    z.array(LedgerCreateRequestDto.getSchema()).min(1),
) {}

export class LedgerBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: LedgerCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

export class LedgerResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        date: dateValueSchema,
        balance: z.number().int(),
        comment: z.string(),
        io: z.boolean(),
        from: z.enum(ledgerFromValues).optional().nullable(),
        bank: z.string().optional().nullable(),
        type: z.enum(ledgerTypeValues),
    }),
) {}

export class LedgerListResponseDto extends createZodModel(z.array(LedgerResponseDto.getSchema())) {}

export class LedgerPageResponseDto extends createZodModel(
    PageData.schema(LedgerResponseDto.getSchema()),
) {}

export class LedgerBatchCreateResponseDto extends createZodModel(
    z.array(LedgerResponseDto.getSchema()),
) {}

export class LedgerImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(LedgerResponseDto.getSchema()),
    }),
) {}

export class LedgerImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class LedgerExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class LedgerWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的账本记录 DTO。 */
export type Ledger = z.output<ReturnType<typeof LedgerResponseDto.getSchema>>;

export const ledgerResourceSchema = {
    resourceName: 'ledger',
    createSchema: LedgerCreateRequestDto.getSchema(),
    updateSchema: LedgerCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'date', width: 20 },
        { key: 'balance' },
        { key: 'comment', width: 30 },
        { key: 'io' },
        { key: 'from' },
        { key: 'bank' },
        { key: 'type', width: 20 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

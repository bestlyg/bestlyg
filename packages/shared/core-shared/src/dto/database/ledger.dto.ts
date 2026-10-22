import { z } from 'zod';
import { PageData } from '../../page-data';
import { PageParam } from '../../page-param';
import {
    DatabaseWriteResponseSchema,
    dateValueSchema,
    EntityBaseResponseSchema,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseSchema,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseSchema,
    DatabaseXlsxImportResponseSchema,
} from './xlsx.dto';
import { ledgerFromValues, ledgerTypeValues } from './enums';

const hasLedgerUpdateFields = (value: object) => Object.keys(value).length > 0;

const ledgerCreateSchema = z.object({
    date: z.coerce.date(),
    balance: z.coerce.number().int(),
    comment: z.coerce.string().trim().min(1),
    io: z.boolean().default(false),
    from: z.enum(ledgerFromValues).optional().nullable(),
    bank: z.coerce.string().optional().nullable(),
    type: z.enum(ledgerTypeValues),
});

const ledgerUpdateSchema = z
    .object({
        date: z.coerce.date(),
        balance: z.coerce.number().int(),
        comment: z.coerce.string().trim().min(1),
        io: z.boolean(),
        from: z.enum(ledgerFromValues).optional().nullable(),
        bank: z.coerce.string().optional().nullable(),
        type: z.enum(ledgerTypeValues),
    })
    .partial();

/** 账本列表查询请求 DTO。 */
export const LedgerQueryRequestSchema = z
    .object({
        date: z.string().min(1).optional(),
    })
    .strip();
export type LedgerQueryRequestDto = z.output<typeof LedgerQueryRequestSchema>;

/** 账本分页查询请求 DTO。 */
export const LedgerPageRequestSchema = LedgerQueryRequestSchema.extend(PageParam.fields).strip();
export type LedgerPageRequestDto = z.output<typeof LedgerPageRequestSchema>;

/** 账本 XLSX 导出查询请求 DTO。 */
export const LedgerExportRequestSchema = LedgerQueryRequestSchema;
export type LedgerExportRequestDto = z.output<typeof LedgerExportRequestSchema>;

/** 创建账本记录请求 DTO。 */
export const LedgerCreateRequestSchema = ledgerCreateSchema;
export type LedgerCreateRequestDto = z.output<typeof LedgerCreateRequestSchema>;

/** 更新账本记录请求 DTO，至少需要提交一个可更新字段。 */
export const LedgerUpdateRequestSchema = ledgerUpdateSchema.refine(hasLedgerUpdateFields, {
    message: '请求体至少需要包含一个字段',
});
export type LedgerUpdateRequestDto = z.output<typeof LedgerUpdateRequestSchema>;

/** 批量创建账本记录请求 DTO。 */
export const LedgerBatchCreateRequestSchema = z.array(LedgerCreateRequestSchema).min(1);
export type LedgerBatchCreateRequestDto = z.output<typeof LedgerBatchCreateRequestSchema>;

/** 批量更新账本记录请求 DTO。 */
export const LedgerBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: ledgerUpdateSchema.refine(hasLedgerUpdateFields, {
        message: '批量更新数据至少需要包含一个字段',
    }),
});
export type LedgerBatchUpdateRequestDto = z.output<typeof LedgerBatchUpdateRequestSchema>;

/** 账本记录响应 DTO。 */
export const LedgerResponseSchema = EntityBaseResponseSchema.extend({
    date: dateValueSchema,
    balance: z.number().int(),
    comment: z.string(),
    io: z.boolean(),
    from: z.enum(ledgerFromValues).optional().nullable(),
    bank: z.string().optional().nullable(),
    type: z.enum(ledgerTypeValues),
});
export type LedgerResponseDto = z.output<typeof LedgerResponseSchema>;

/** 账本记录列表响应 DTO。 */
export const LedgerListResponseSchema = z.array(LedgerResponseSchema);
export type LedgerListResponseDto = z.output<typeof LedgerListResponseSchema>;

/** 账本记录分页响应 DTO。 */
export const LedgerPageResponseSchema = PageData.schema(LedgerResponseSchema);
export type LedgerPageResponseDto = z.output<typeof LedgerPageResponseSchema>;

/** 批量创建账本记录响应 DTO。 */
export const LedgerBatchCreateResponseSchema = z.array(LedgerResponseSchema);
export type LedgerBatchCreateResponseDto = z.output<typeof LedgerBatchCreateResponseSchema>;

/** 账本 XLSX 新增导入响应 DTO。 */
export const LedgerImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(LedgerResponseSchema),
});
export type LedgerImportResponseDto = z.output<typeof LedgerImportResponseSchema>;

/** 账本 XLSX 更新导入响应 DTO。 */
export const LedgerImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type LedgerImportUpdateResponseDto = z.output<typeof LedgerImportUpdateResponseSchema>;

/** 账本 XLSX 导出响应 DTO。 */
export const LedgerExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type LedgerExportResponseDto = z.output<typeof LedgerExportResponseSchema>;

/** 账本写操作响应 DTO。 */
export const LedgerWriteResponseSchema = DatabaseWriteResponseSchema;
export type LedgerWriteResponseDto = z.output<typeof LedgerWriteResponseSchema>;

/** 前端消费的账本记录 DTO。 */
export type Ledger = LedgerResponseDto;

/** 账本资源的 XLSX 导入导出配置。 */
export const ledgerResourceSchema = {
    resourceName: 'ledger',
    createSchema: LedgerCreateRequestSchema,
    updateSchema: ledgerUpdateSchema,
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

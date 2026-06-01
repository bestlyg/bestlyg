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

/** 账本列表查询请求 DTO。 */
export class LedgerQueryRequestDto extends createZodModel(
    z
        .object({
            date: z.string().min(1).optional(),
        })
        .strip(),
) {}

/** 账本分页查询请求 DTO。 */
export class LedgerPageRequestDto extends createZodModel(
    LedgerQueryRequestDto.getSchema().extend(PageParam.fields).strip(),
) {}

/** 账本 XLSX 导出查询请求 DTO。 */
export class LedgerExportRequestDto extends createZodModel(LedgerQueryRequestDto.getSchema()) {}

/** 创建账本记录请求 DTO。 */
export class LedgerCreateRequestDto extends createZodModel(
    z
        .object({
            date: z.coerce.date(),
            balance: z.coerce.number().int(),
            comment: z.coerce.string().trim().min(1),
            io: z.boolean().default(false),
            from: z.enum(ledgerFromValues).optional().nullable(),
            bank: z.coerce.string().optional().nullable(),
            type: z.enum(ledgerTypeValues),
        })
       ,
) {}

/** 更新账本记录请求 DTO，至少需要提交一个可更新字段。 */
export class LedgerUpdateRequestDto extends createZodModel(
    LedgerCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建账本记录请求 DTO。 */
export class LedgerBatchCreateRequestDto extends createZodModel(
    z.array(LedgerCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新账本记录请求 DTO。 */
export class LedgerBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: LedgerCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** 账本记录响应 DTO。 */
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

/** 账本记录列表响应 DTO。 */
export class LedgerListResponseDto extends createZodModel(z.array(LedgerResponseDto.getSchema())) {}

/** 账本记录分页响应 DTO。 */
export class LedgerPageResponseDto extends createZodModel(
    PageData.schema(LedgerResponseDto.getSchema()),
) {}

/** 批量创建账本记录响应 DTO。 */
export class LedgerBatchCreateResponseDto extends createZodModel(
    z.array(LedgerResponseDto.getSchema()),
) {}

/** 账本 XLSX 新增导入响应 DTO。 */
export class LedgerImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(LedgerResponseDto.getSchema()),
    }),
) {}

/** 账本 XLSX 更新导入响应 DTO。 */
export class LedgerImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** 账本 XLSX 导出响应 DTO。 */
export class LedgerExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** 账本写操作响应 DTO。 */
export class LedgerWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的账本记录 DTO。 */
export type Ledger = z.output<ReturnType<typeof LedgerResponseDto.getSchema>>;

/** 账本资源的 XLSX 导入导出配置。 */
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

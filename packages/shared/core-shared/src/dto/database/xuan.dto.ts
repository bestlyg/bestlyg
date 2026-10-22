import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestSchema,
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

/** 体重/运动记录分页查询请求 DTO。 */
export const XuanPageRequestSchema = DatabasePageRequestSchema;
export type XuanPageRequestDto = z.output<typeof XuanPageRequestSchema>;

/** 创建体重/运动记录请求 DTO。 */
export const XuanCreateRequestSchema = z
    .object({
        date: z.coerce.date(),
        weight: z.preprocess(
            (value) => (value === '' ? undefined : value),
            z.coerce.number().int().optional().nullable(),
        ),
        dance_times: z.preprocess(
            (value) => (value === '' ? undefined : value),
            z.coerce.number().int().optional().nullable(),
        ),
    })
    .strict();
export type XuanCreateRequestDto = z.output<typeof XuanCreateRequestSchema>;

/** 更新体重/运动记录请求 DTO，至少需要提交一个可更新字段。 */
export const XuanUpdateRequestSchema = XuanCreateRequestSchema.partial().refine(
    (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
    { message: '请求体至少需要包含一个字段' },
);
export type XuanUpdateRequestDto = z.output<typeof XuanUpdateRequestSchema>;

/** 批量创建体重/运动记录请求 DTO。 */
export const XuanBatchCreateRequestSchema = z.array(XuanCreateRequestSchema).min(1);
export type XuanBatchCreateRequestDto = z.output<typeof XuanBatchCreateRequestSchema>;

/** 批量更新体重/运动记录请求 DTO。 */
export const XuanBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: XuanCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '批量更新数据至少需要包含一个字段' },
    ),
});
export type XuanBatchUpdateRequestDto = z.output<typeof XuanBatchUpdateRequestSchema>;

/** 体重/运动记录响应 DTO。 */
export const XuanResponseSchema = EntityBaseResponseSchema.extend({
    date: dateValueSchema,
    weight: z.number().int().optional().nullable(),
    dance_times: z.number().int().optional().nullable(),
});
export type XuanResponseDto = z.output<typeof XuanResponseSchema>;

/** 体重/运动记录列表响应 DTO。 */
export const XuanListResponseSchema = z.array(XuanResponseSchema);
export type XuanListResponseDto = z.output<typeof XuanListResponseSchema>;

/** 体重/运动记录分页响应 DTO。 */
export const XuanPageResponseSchema = PageData.schema(XuanResponseSchema);
export type XuanPageResponseDto = z.output<typeof XuanPageResponseSchema>;

/** 批量创建体重/运动记录响应 DTO。 */
export const XuanBatchCreateResponseSchema = z.array(XuanResponseSchema);
export type XuanBatchCreateResponseDto = z.output<typeof XuanBatchCreateResponseSchema>;

/** 体重/运动记录 XLSX 新增导入响应 DTO。 */
export const XuanImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(XuanResponseSchema),
});
export type XuanImportResponseDto = z.output<typeof XuanImportResponseSchema>;

/** 体重/运动记录 XLSX 更新导入响应 DTO。 */
export const XuanImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type XuanImportUpdateResponseDto = z.output<typeof XuanImportUpdateResponseSchema>;

/** 体重/运动记录 XLSX 导出响应 DTO。 */
export const XuanExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type XuanExportResponseDto = z.output<typeof XuanExportResponseSchema>;

/** 体重/运动记录写操作响应 DTO。 */
export const XuanWriteResponseSchema = DatabaseWriteResponseSchema;
export type XuanWriteResponseDto = z.output<typeof XuanWriteResponseSchema>;

/** 前端消费的体重/运动记录 DTO。 */
export type Xuan = XuanResponseDto;

/** 体重/运动记录资源的 XLSX 导入导出配置。 */
export const xuanResourceSchema = {
    resourceName: 'xuan',
    createSchema: XuanCreateRequestSchema,
    updateSchema: XuanCreateRequestSchema.partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'date', width: 20 },
        { key: 'weight' },
        { key: 'dance_times' },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

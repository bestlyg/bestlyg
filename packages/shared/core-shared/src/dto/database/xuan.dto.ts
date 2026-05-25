import { createZodModel } from '../../zod';
import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestDto,
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

/** 体重/运动记录分页查询请求 DTO。 */
export class XuanPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

/** 创建体重/运动记录请求 DTO。 */
export class XuanCreateRequestDto extends createZodModel(
    z
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
        .strict(),
) {}

/** 更新体重/运动记录请求 DTO，至少需要提交一个可更新字段。 */
export class XuanUpdateRequestDto extends createZodModel(
    XuanCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建体重/运动记录请求 DTO。 */
export class XuanBatchCreateRequestDto extends createZodModel(
    z.array(XuanCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新体重/运动记录请求 DTO。 */
export class XuanBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: XuanCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** 体重/运动记录响应 DTO。 */
export class XuanResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        date: dateValueSchema,
        weight: z.number().int().optional().nullable(),
        dance_times: z.number().int().optional().nullable(),
    }),
) {}

/** 体重/运动记录列表响应 DTO。 */
export class XuanListResponseDto extends createZodModel(z.array(XuanResponseDto.getSchema())) {}

/** 体重/运动记录分页响应 DTO。 */
export class XuanPageResponseDto extends createZodModel(
    PageData.schema(XuanResponseDto.getSchema()),
) {}

/** 批量创建体重/运动记录响应 DTO。 */
export class XuanBatchCreateResponseDto extends createZodModel(
    z.array(XuanResponseDto.getSchema()),
) {}

/** 体重/运动记录 XLSX 新增导入响应 DTO。 */
export class XuanImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(XuanResponseDto.getSchema()),
    }),
) {}

/** 体重/运动记录 XLSX 更新导入响应 DTO。 */
export class XuanImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** 体重/运动记录 XLSX 导出响应 DTO。 */
export class XuanExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** 体重/运动记录写操作响应 DTO。 */
export class XuanWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的体重/运动记录 DTO。 */
export type Xuan = z.output<ReturnType<typeof XuanResponseDto.getSchema>>;

/** 体重/运动记录资源的 XLSX 导入导出配置。 */
export const xuanResourceSchema = {
    resourceName: 'xuan',
    createSchema: XuanCreateRequestDto.getSchema(),
    updateSchema: XuanCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'date', width: 20 },
        { key: 'weight' },
        { key: 'dance_times' },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

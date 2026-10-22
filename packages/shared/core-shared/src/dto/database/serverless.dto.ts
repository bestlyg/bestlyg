import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestSchema,
    DatabaseWriteResponseSchema,
    EntityBaseResponseSchema,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseSchema,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseSchema,
    DatabaseXlsxImportResponseSchema,
} from './xlsx.dto';

/** Serverless 函数分页查询请求 DTO。 */
export const ServerlessPageRequestSchema = DatabasePageRequestSchema;
export type ServerlessPageRequestDto = z.output<typeof ServerlessPageRequestSchema>;

/** 创建 Serverless 函数请求 DTO。 */
export const ServerlessCreateRequestSchema = z
    .object({
        name: z.coerce.string().trim().min(1),
        code: z.coerce.string().trim().min(1),
    })
    .strict();
export type ServerlessCreateRequestDto = z.output<typeof ServerlessCreateRequestSchema>;

/** 更新 Serverless 函数请求 DTO，至少需要提交一个可更新字段。 */
export const ServerlessUpdateRequestSchema = ServerlessCreateRequestSchema.partial().refine(
    (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
    { message: '请求体至少需要包含一个字段' },
);
export type ServerlessUpdateRequestDto = z.output<typeof ServerlessUpdateRequestSchema>;

/** 批量创建 Serverless 函数请求 DTO。 */
export const ServerlessBatchCreateRequestSchema = z.array(ServerlessCreateRequestSchema).min(1);
export type ServerlessBatchCreateRequestDto = z.output<typeof ServerlessBatchCreateRequestSchema>;

/** 批量更新 Serverless 函数请求 DTO。 */
export const ServerlessBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: ServerlessCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '批量更新数据至少需要包含一个字段' },
    ),
});
export type ServerlessBatchUpdateRequestDto = z.output<typeof ServerlessBatchUpdateRequestSchema>;

/** Serverless 函数响应 DTO。 */
export const ServerlessResponseSchema = EntityBaseResponseSchema.extend({
    name: z.string(),
    code: z.string(),
});
export type ServerlessResponseDto = z.output<typeof ServerlessResponseSchema>;

/** Serverless 函数列表响应 DTO。 */
export const ServerlessListResponseSchema = z.array(ServerlessResponseSchema);
export type ServerlessListResponseDto = z.output<typeof ServerlessListResponseSchema>;

/** Serverless 函数分页响应 DTO。 */
export const ServerlessPageResponseSchema = PageData.schema(ServerlessResponseSchema);
export type ServerlessPageResponseDto = z.output<typeof ServerlessPageResponseSchema>;

/** 批量创建 Serverless 函数响应 DTO。 */
export const ServerlessBatchCreateResponseSchema = z.array(ServerlessResponseSchema);
export type ServerlessBatchCreateResponseDto = z.output<typeof ServerlessBatchCreateResponseSchema>;

/** Serverless 函数 XLSX 新增导入响应 DTO。 */
export const ServerlessImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(ServerlessResponseSchema),
});
export type ServerlessImportResponseDto = z.output<typeof ServerlessImportResponseSchema>;

/** Serverless 函数 XLSX 更新导入响应 DTO。 */
export const ServerlessImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type ServerlessImportUpdateResponseDto = z.output<
    typeof ServerlessImportUpdateResponseSchema
>;

/** Serverless 函数 XLSX 导出响应 DTO。 */
export const ServerlessExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type ServerlessExportResponseDto = z.output<typeof ServerlessExportResponseSchema>;

/** Serverless 函数写操作响应 DTO。 */
export const ServerlessWriteResponseSchema = DatabaseWriteResponseSchema;
export type ServerlessWriteResponseDto = z.output<typeof ServerlessWriteResponseSchema>;

/** 前端消费的 serverless 函数 DTO。 */
export type Serverless = ServerlessResponseDto;

/** Serverless 函数资源的 XLSX 导入导出配置。 */
export const serverlessResourceSchema = {
    resourceName: 'serverless',
    createSchema: ServerlessCreateRequestSchema,
    updateSchema: ServerlessCreateRequestSchema.partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'code', width: 60 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

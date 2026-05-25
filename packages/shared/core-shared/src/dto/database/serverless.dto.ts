import { createZodModel } from '../../zod';
import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestDto,
    DatabaseWriteResponseDto,
    EntityBaseResponseDto,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseDto,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseDto,
    DatabaseXlsxImportResponseDto,
} from './xlsx.dto';

/** Serverless 函数分页查询请求 DTO。 */
export class ServerlessPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

/** 创建 Serverless 函数请求 DTO。 */
export class ServerlessCreateRequestDto extends createZodModel(
    z
        .object({
            name: z.coerce.string().trim().min(1),
            code: z.coerce.string().trim().min(1),
        })
        .strict(),
) {}

/** 更新 Serverless 函数请求 DTO，至少需要提交一个可更新字段。 */
export class ServerlessUpdateRequestDto extends createZodModel(
    ServerlessCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建 Serverless 函数请求 DTO。 */
export class ServerlessBatchCreateRequestDto extends createZodModel(
    z.array(ServerlessCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新 Serverless 函数请求 DTO。 */
export class ServerlessBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: ServerlessCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** Serverless 函数响应 DTO。 */
export class ServerlessResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        code: z.string(),
    }),
) {}

/** Serverless 函数列表响应 DTO。 */
export class ServerlessListResponseDto extends createZodModel(
    z.array(ServerlessResponseDto.getSchema()),
) {}

/** Serverless 函数分页响应 DTO。 */
export class ServerlessPageResponseDto extends createZodModel(
    PageData.schema(ServerlessResponseDto.getSchema()),
) {}

/** 批量创建 Serverless 函数响应 DTO。 */
export class ServerlessBatchCreateResponseDto extends createZodModel(
    z.array(ServerlessResponseDto.getSchema()),
) {}

/** Serverless 函数 XLSX 新增导入响应 DTO。 */
export class ServerlessImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(ServerlessResponseDto.getSchema()),
    }),
) {}

/** Serverless 函数 XLSX 更新导入响应 DTO。 */
export class ServerlessImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** Serverless 函数 XLSX 导出响应 DTO。 */
export class ServerlessExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** Serverless 函数写操作响应 DTO。 */
export class ServerlessWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 前端消费的 serverless 函数 DTO。 */
export type Serverless = z.output<ReturnType<typeof ServerlessResponseDto.getSchema>>;

/** Serverless 函数资源的 XLSX 导入导出配置。 */
export const serverlessResourceSchema = {
    resourceName: 'serverless',
    createSchema: ServerlessCreateRequestDto.getSchema(),
    updateSchema: ServerlessCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'code', width: 60 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

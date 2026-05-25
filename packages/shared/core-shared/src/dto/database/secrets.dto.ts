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

/** 密钥分页查询请求 DTO。 */
export class SecretsPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

/** 创建密钥请求 DTO。 */
export class SecretsCreateRequestDto extends createZodModel(
    z
        .object({
            name: z.coerce.string().trim().min(1),
            data: z.coerce.string().trim().min(1),
        })
        .strict(),
) {}

/** 更新密钥请求 DTO，至少需要提交一个可更新字段。 */
export class SecretsUpdateRequestDto extends createZodModel(
    SecretsCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建密钥请求 DTO。 */
export class SecretsBatchCreateRequestDto extends createZodModel(
    z.array(SecretsCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新密钥请求 DTO。 */
export class SecretsBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: SecretsCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** 密钥响应 DTO。 */
export class SecretsResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        data: z.string(),
    }),
) {}

/** 密钥列表响应 DTO。 */
export class SecretsListResponseDto extends createZodModel(
    z.array(SecretsResponseDto.getSchema()),
) {}

/** 密钥分页响应 DTO。 */
export class SecretsPageResponseDto extends createZodModel(
    PageData.schema(SecretsResponseDto.getSchema()),
) {}

/** 批量创建密钥响应 DTO。 */
export class SecretsBatchCreateResponseDto extends createZodModel(
    z.array(SecretsResponseDto.getSchema()),
) {}

/** 密钥 XLSX 新增导入响应 DTO。 */
export class SecretsImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(SecretsResponseDto.getSchema()),
    }),
) {}

/** 密钥 XLSX 更新导入响应 DTO。 */
export class SecretsImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** 密钥 XLSX 导出响应 DTO。 */
export class SecretsExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** 密钥写操作响应 DTO。 */
export class SecretsWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的密钥 DTO。 */
export type Secrets = z.output<ReturnType<typeof SecretsResponseDto.getSchema>>;

/** 密钥资源的 XLSX 导入导出配置。 */
export const secretsResourceSchema = {
    resourceName: 'secrets',
    createSchema: SecretsCreateRequestDto.getSchema(),
    updateSchema: SecretsCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'data', width: 48 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

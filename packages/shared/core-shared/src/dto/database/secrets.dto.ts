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

/** 密钥分页查询请求 DTO。 */
export const SecretsPageRequestSchema = DatabasePageRequestSchema;
export type SecretsPageRequestDto = z.output<typeof SecretsPageRequestSchema>;

/** 创建密钥请求 DTO。 */
export const SecretsCreateRequestSchema = z
    .object({
        name: z.coerce.string().trim().min(1),
        data: z.coerce.string().trim().min(1),
    })
    .strict();
export type SecretsCreateRequestDto = z.output<typeof SecretsCreateRequestSchema>;

/** 更新密钥请求 DTO，至少需要提交一个可更新字段。 */
export const SecretsUpdateRequestSchema = SecretsCreateRequestSchema.partial().refine(
    (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
    { message: '请求体至少需要包含一个字段' },
);
export type SecretsUpdateRequestDto = z.output<typeof SecretsUpdateRequestSchema>;

/** 批量创建密钥请求 DTO。 */
export const SecretsBatchCreateRequestSchema = z.array(SecretsCreateRequestSchema).min(1);
export type SecretsBatchCreateRequestDto = z.output<typeof SecretsBatchCreateRequestSchema>;

/** 批量更新密钥请求 DTO。 */
export const SecretsBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: SecretsCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '批量更新数据至少需要包含一个字段' },
    ),
});
export type SecretsBatchUpdateRequestDto = z.output<typeof SecretsBatchUpdateRequestSchema>;

/** 密钥响应 DTO。 */
export const SecretsResponseSchema = EntityBaseResponseSchema.extend({
    name: z.string(),
    data: z.string(),
});
export type SecretsResponseDto = z.output<typeof SecretsResponseSchema>;

/** 密钥列表响应 DTO。 */
export const SecretsListResponseSchema = z.array(SecretsResponseSchema);
export type SecretsListResponseDto = z.output<typeof SecretsListResponseSchema>;

/** 密钥分页响应 DTO。 */
export const SecretsPageResponseSchema = PageData.schema(SecretsResponseSchema);
export type SecretsPageResponseDto = z.output<typeof SecretsPageResponseSchema>;

/** 批量创建密钥响应 DTO。 */
export const SecretsBatchCreateResponseSchema = z.array(SecretsResponseSchema);
export type SecretsBatchCreateResponseDto = z.output<typeof SecretsBatchCreateResponseSchema>;

/** 密钥 XLSX 新增导入响应 DTO。 */
export const SecretsImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(SecretsResponseSchema),
});
export type SecretsImportResponseDto = z.output<typeof SecretsImportResponseSchema>;

/** 密钥 XLSX 更新导入响应 DTO。 */
export const SecretsImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type SecretsImportUpdateResponseDto = z.output<typeof SecretsImportUpdateResponseSchema>;

/** 密钥 XLSX 导出响应 DTO。 */
export const SecretsExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type SecretsExportResponseDto = z.output<typeof SecretsExportResponseSchema>;

/** 密钥写操作响应 DTO。 */
export const SecretsWriteResponseSchema = DatabaseWriteResponseSchema;
export type SecretsWriteResponseDto = z.output<typeof SecretsWriteResponseSchema>;

/** 前端消费的密钥 DTO。 */
export type Secrets = SecretsResponseDto;

/** 密钥资源的 XLSX 导入导出配置。 */
export const secretsResourceSchema = {
    resourceName: 'secrets',
    createSchema: SecretsCreateRequestSchema,
    updateSchema: SecretsCreateRequestSchema.partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'data', width: 48 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

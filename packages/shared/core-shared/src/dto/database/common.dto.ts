import { z } from 'zod';
import { PageParam } from '../../page-param';

export const idSchema = z.uuid();
export const dateValueSchema = z.union([z.date(), z.string()]);

/** API JSON 中日期字段在前后端之间允许保留 Date 或序列化后的字符串。 */
export type DateValue = z.output<typeof dateValueSchema>;

export const pageQueryFields = PageParam.fields;

/** 数据库实体响应共享的基础字段 DTO。 */
export const EntityBaseResponseSchema = z.object({
    id: idSchema.optional(),
    createdTime: dateValueSchema.optional(),
    updatedTime: dateValueSchema.optional(),
});
export type EntityBaseResponseDto = z.output<typeof EntityBaseResponseSchema>;

/** 服务端实体暴露给前端时共享的基础字段。 */
export type EntityBase = EntityBaseResponseDto;

/** 通用数据库分页查询请求 DTO。 */
export const DatabasePageRequestSchema = PageParam.schema;
export type DatabasePageRequestDto = z.output<typeof DatabasePageRequestSchema>;

/** 通用数据库单条资源路径参数请求 DTO。 */
export const DatabaseIdParamsRequestSchema = z.object({ id: idSchema });
export type DatabaseIdParamsRequestDto = z.output<typeof DatabaseIdParamsRequestSchema>;

/** 通用数据库批量删除请求 DTO。 */
export const DatabaseBatchDeleteRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
});
export type DatabaseBatchDeleteRequestDto = z.output<typeof DatabaseBatchDeleteRequestSchema>;

/** 通用数据库写操作响应 DTO。 */
export const DatabaseWriteResponseSchema = z.object({
    affected: z.number().int().nonnegative().optional().nullable(),
});
export type DatabaseWriteResponseDto = z.output<typeof DatabaseWriteResponseSchema>;

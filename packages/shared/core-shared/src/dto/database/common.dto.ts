import { createZodModel } from '../../zod';
import { z } from 'zod';
import { PageParam } from '../../page-param';

export const idSchema = z.uuid();
export const dateValueSchema = z.union([z.date(), z.string()]);

/** API JSON 中日期字段在前后端之间允许保留 Date 或序列化后的字符串。 */
export type DateValue = z.output<typeof dateValueSchema>;

export const pageQueryFields = PageParam.fields;
export class EntityBaseResponseDto extends createZodModel(
    z.object({
        id: idSchema.optional(),
        createdTime: dateValueSchema.optional(),
        updatedTime: dateValueSchema.optional(),
    }),
) {}

/** 服务端实体暴露给前端时共享的基础字段。 */
export type EntityBase = z.output<ReturnType<typeof EntityBaseResponseDto.getSchema>>;

export class DatabasePageRequestDto extends createZodModel(PageParam.schema) {}
export class DatabaseIdParamsRequestDto extends createZodModel(z.object({ id: idSchema })) {}
export class DatabaseBatchDeleteRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
    }),
) {}
export class DatabaseWriteResponseDto extends createZodModel(
    z.object({
        affected: z.number().int().nonnegative().optional().nullable(),
    }),
) {}

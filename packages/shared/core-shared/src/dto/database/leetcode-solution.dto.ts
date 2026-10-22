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
import { leetcodeScriptTypeValues } from './enums';

/** LeetCode 题解分页查询请求 DTO。 */
export const LeetcodeSolutionPageRequestSchema = DatabasePageRequestSchema;
export type LeetcodeSolutionPageRequestDto = z.output<typeof LeetcodeSolutionPageRequestSchema>;

/** 创建 LeetCode 题解请求 DTO。 */
export const LeetcodeSolutionCreateRequestSchema = z
    .object({
        script: z.enum(leetcodeScriptTypeValues),
        date: z.coerce.date(),
        time: z.preprocess(
            (value) => (value === '' ? undefined : value),
            z.coerce.number().optional().nullable(),
        ),
        memory: z.preprocess(
            (value) => (value === '' ? undefined : value),
            z.coerce.number().optional().nullable(),
        ),
        desc: z.coerce.string().trim().min(1),
        code: z.coerce.string().trim().min(1),
        problem: z.object({ id: idSchema }).optional(),
    })
    .strict();
export type LeetcodeSolutionCreateRequestDto = z.output<typeof LeetcodeSolutionCreateRequestSchema>;

/** 更新 LeetCode 题解请求 DTO，至少需要提交一个可更新字段。 */
export const LeetcodeSolutionUpdateRequestSchema =
    LeetcodeSolutionCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '请求体至少需要包含一个字段' },
    );
export type LeetcodeSolutionUpdateRequestDto = z.output<typeof LeetcodeSolutionUpdateRequestSchema>;

/** 批量创建 LeetCode 题解请求 DTO。 */
export const LeetcodeSolutionBatchCreateRequestSchema = z
    .array(LeetcodeSolutionCreateRequestSchema)
    .min(1);
export type LeetcodeSolutionBatchCreateRequestDto = z.output<
    typeof LeetcodeSolutionBatchCreateRequestSchema
>;

/** 批量更新 LeetCode 题解请求 DTO。 */
export const LeetcodeSolutionBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: LeetcodeSolutionCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '批量更新数据至少需要包含一个字段' },
    ),
});
export type LeetcodeSolutionBatchUpdateRequestDto = z.output<
    typeof LeetcodeSolutionBatchUpdateRequestSchema
>;

/** LeetCode 题解响应 DTO。 */
export const LeetcodeSolutionResponseSchema = EntityBaseResponseSchema.extend({
    script: z.enum(leetcodeScriptTypeValues),
    date: dateValueSchema,
    time: z.number().optional().nullable(),
    memory: z.number().optional().nullable(),
    desc: z.string(),
    code: z.string(),
    problem: z.unknown().optional(),
});
export type LeetcodeSolutionResponseDto = z.output<typeof LeetcodeSolutionResponseSchema>;

/** LeetCode 题解列表响应 DTO。 */
export const LeetcodeSolutionListResponseSchema = z.array(LeetcodeSolutionResponseSchema);
export type LeetcodeSolutionListResponseDto = z.output<typeof LeetcodeSolutionListResponseSchema>;

/** LeetCode 题解分页响应 DTO。 */
export const LeetcodeSolutionPageResponseSchema = PageData.schema(LeetcodeSolutionResponseSchema);
export type LeetcodeSolutionPageResponseDto = z.output<typeof LeetcodeSolutionPageResponseSchema>;

/** 批量创建 LeetCode 题解响应 DTO。 */
export const LeetcodeSolutionBatchCreateResponseSchema = z.array(LeetcodeSolutionResponseSchema);
export type LeetcodeSolutionBatchCreateResponseDto = z.output<
    typeof LeetcodeSolutionBatchCreateResponseSchema
>;

/** LeetCode 题解 XLSX 新增导入响应 DTO。 */
export const LeetcodeSolutionImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(LeetcodeSolutionResponseSchema),
});
export type LeetcodeSolutionImportResponseDto = z.output<
    typeof LeetcodeSolutionImportResponseSchema
>;

/** LeetCode 题解 XLSX 更新导入响应 DTO。 */
export const LeetcodeSolutionImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type LeetcodeSolutionImportUpdateResponseDto = z.output<
    typeof LeetcodeSolutionImportUpdateResponseSchema
>;

/** LeetCode 题解 XLSX 导出响应 DTO。 */
export const LeetcodeSolutionExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type LeetcodeSolutionExportResponseDto = z.output<
    typeof LeetcodeSolutionExportResponseSchema
>;

/** LeetCode 题解写操作响应 DTO。 */
export const LeetcodeSolutionWriteResponseSchema = DatabaseWriteResponseSchema;
export type LeetcodeSolutionWriteResponseDto = z.output<typeof LeetcodeSolutionWriteResponseSchema>;

/** 前端消费的 LeetCode 题解 DTO。 */
export type LeetcodeSolution = LeetcodeSolutionResponseDto;

/** LeetCode 题解资源的 XLSX 导入导出配置。 */
export const leetcodeSolutionResourceSchema = {
    resourceName: 'leetcode-solution',
    createSchema: LeetcodeSolutionCreateRequestSchema,
    updateSchema: LeetcodeSolutionCreateRequestSchema.partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'script' },
        { key: 'date', width: 20 },
        { key: 'time' },
        { key: 'memory' },
        { key: 'desc', width: 48 },
        { key: 'code', width: 60 },
        {
            key: 'problem',
            width: 38,
            format: (value) => (value == null ? value : JSON.stringify(value)),
        },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

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
import { leetcodeLevelTypeValues } from './enums';
import {
    LeetcodeSolutionCreateRequestSchema,
    LeetcodeSolutionResponseSchema,
} from './leetcode-solution.dto';

const hasLeetcodeProblemUpdateFields = (value: object) => Object.keys(value).length > 0;

const tagsSchema = z.preprocess((value) => {
    if (typeof value !== 'string') {
        return value;
    }

    const trimmed = value.trim();
    return trimmed ? JSON.parse(trimmed) : undefined;
}, z.array(z.string()).optional());

const leetcodeProblemCreateSchema = z
    .object({
        name: z.coerce.string().trim().min(1),
        url: z.coerce.string().trim().min(1),
        desc: z.coerce.string().trim().min(1),
        tags: tagsSchema.default([]),
        level: z.enum(leetcodeLevelTypeValues),
        solutions: z.preprocess(
            (value) => {
                if (typeof value !== 'string') {
                    return value;
                }

                const trimmed = value.trim();
                return trimmed ? JSON.parse(trimmed) : undefined;
            },
            z.array(LeetcodeSolutionCreateRequestSchema.omit({ problem: true })).optional(),
        ),
    })
    .strict();

const leetcodeProblemUpdateSchema = z
    .object({
        name: z.coerce.string().trim().min(1),
        url: z.coerce.string().trim().min(1),
        desc: z.coerce.string().trim().min(1),
        tags: tagsSchema,
        level: z.enum(leetcodeLevelTypeValues),
    })
    .strict()
    .partial();

/** LeetCode 题目分页查询请求 DTO。 */
export const LeetcodeProblemPageRequestSchema = DatabasePageRequestSchema;
export type LeetcodeProblemPageRequestDto = z.output<typeof LeetcodeProblemPageRequestSchema>;

/** 创建 LeetCode 题目请求 DTO，可携带内联题解列表。 */
export const LeetcodeProblemCreateRequestSchema = leetcodeProblemCreateSchema;
export type LeetcodeProblemCreateRequestDto = z.output<typeof LeetcodeProblemCreateRequestSchema>;

/** 更新 LeetCode 题目请求 DTO，至少需要提交一个可更新字段。 */
export const LeetcodeProblemUpdateRequestSchema = leetcodeProblemUpdateSchema.refine(
    hasLeetcodeProblemUpdateFields,
    {
        message: '请求体至少需要包含一个字段',
    },
);
export type LeetcodeProblemUpdateRequestDto = z.output<typeof LeetcodeProblemUpdateRequestSchema>;

/** 批量创建 LeetCode 题目请求 DTO。 */
export const LeetcodeProblemBatchCreateRequestSchema = z
    .array(LeetcodeProblemCreateRequestSchema)
    .min(1);
export type LeetcodeProblemBatchCreateRequestDto = z.output<
    typeof LeetcodeProblemBatchCreateRequestSchema
>;

/** 批量更新 LeetCode 题目请求 DTO。 */
export const LeetcodeProblemBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: leetcodeProblemUpdateSchema.refine(hasLeetcodeProblemUpdateFields, {
        message: '批量更新数据至少需要包含一个字段',
    }),
});
export type LeetcodeProblemBatchUpdateRequestDto = z.output<
    typeof LeetcodeProblemBatchUpdateRequestSchema
>;

/** 按题目名称查询的路径参数请求 DTO。 */
export const LeetcodeNameParamsRequestSchema = z.object({ name: z.string().trim().min(1) });
export type LeetcodeNameParamsRequestDto = z.output<typeof LeetcodeNameParamsRequestSchema>;

/** 按题目 slug 查询的路径参数请求 DTO。 */
export const LeetcodeSlugParamsRequestSchema = z.object({ slug: z.string().trim().min(1) });
export type LeetcodeSlugParamsRequestDto = z.output<typeof LeetcodeSlugParamsRequestSchema>;

/** LeetCode 题目响应 DTO。 */
export const LeetcodeProblemResponseSchema = EntityBaseResponseSchema.extend({
    name: z.string(),
    url: z.string(),
    desc: z.string(),
    tags: z.array(z.string()).optional().nullable(),
    level: z.enum(leetcodeLevelTypeValues),
    solutions: z.array(LeetcodeSolutionResponseSchema).optional(),
});
export type LeetcodeProblemResponseDto = z.output<typeof LeetcodeProblemResponseSchema>;

/** LeetCode 题目列表响应 DTO。 */
export const LeetcodeProblemListResponseSchema = z.array(LeetcodeProblemResponseSchema);
export type LeetcodeProblemListResponseDto = z.output<typeof LeetcodeProblemListResponseSchema>;

/** LeetCode 题目分页响应 DTO。 */
export const LeetcodeProblemPageResponseSchema = PageData.schema(LeetcodeProblemResponseSchema);
export type LeetcodeProblemPageResponseDto = z.output<typeof LeetcodeProblemPageResponseSchema>;

/** 批量创建 LeetCode 题目响应 DTO。 */
export const LeetcodeProblemBatchCreateResponseSchema = z.array(LeetcodeProblemResponseSchema);
export type LeetcodeProblemBatchCreateResponseDto = z.output<
    typeof LeetcodeProblemBatchCreateResponseSchema
>;

/** LeetCode 题目 XLSX 新增导入响应 DTO。 */
export const LeetcodeProblemImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(LeetcodeProblemResponseSchema),
});
export type LeetcodeProblemImportResponseDto = z.output<typeof LeetcodeProblemImportResponseSchema>;

/** LeetCode 题目 XLSX 更新导入响应 DTO。 */
export const LeetcodeProblemImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type LeetcodeProblemImportUpdateResponseDto = z.output<
    typeof LeetcodeProblemImportUpdateResponseSchema
>;

/** LeetCode 题目 XLSX 导出响应 DTO。 */
export const LeetcodeProblemExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type LeetcodeProblemExportResponseDto = z.output<typeof LeetcodeProblemExportResponseSchema>;

/** LeetCode 题目写操作响应 DTO。 */
export const LeetcodeProblemWriteResponseSchema = DatabaseWriteResponseSchema;
export type LeetcodeProblemWriteResponseDto = z.output<typeof LeetcodeProblemWriteResponseSchema>;

/** 按 slug 查询 LeetCode 题目的响应 DTO。 */
export const LeetcodeProblemBySlugResponseSchema = z.looseObject({});
export type LeetcodeProblemBySlugResponseDto = z.output<typeof LeetcodeProblemBySlugResponseSchema>;

/** 前端消费的 LeetCode 题目 DTO，包含题解列表。 */
export type LeetcodeProblem = LeetcodeProblemResponseDto;

/** LeetCode 题目资源的 XLSX 导入导出配置。 */
export const leetcodeProblemResourceSchema = {
    resourceName: 'leetcode-problem',
    createSchema: LeetcodeProblemCreateRequestSchema,
    updateSchema: leetcodeProblemUpdateSchema,
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name', width: 32 },
        { key: 'url', width: 48 },
        { key: 'desc', width: 48 },
        {
            key: 'tags',
            width: 32,
            format: (value) => (value == null ? value : JSON.stringify(value)),
        },
        { key: 'level' },
        {
            key: 'solutions',
            width: 48,
            format: (value) => (value == null ? value : JSON.stringify(value)),
        },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

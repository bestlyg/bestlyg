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
import { leetcodeLevelTypeValues } from './enums';
import {
    LeetcodeSolutionCreateRequestDto,
    LeetcodeSolutionResponseDto,
} from './leetcode-solution.dto';

/** LeetCode 题目分页查询请求 DTO。 */
export class LeetcodeProblemPageRequestDto extends createZodModel(
    DatabasePageRequestDto.getSchema(),
) {}

/** 创建 LeetCode 题目请求 DTO，可携带内联题解列表。 */
export class LeetcodeProblemCreateRequestDto extends createZodModel(
    z
        .object({
            name: z.coerce.string().trim().min(1),
            url: z.coerce.string().trim().min(1),
            desc: z.coerce.string().trim().min(1),
            tags: z
                .preprocess((value) => {
                    if (typeof value !== 'string') {
                        return value;
                    }

                    const trimmed = value.trim();
                    return trimmed ? JSON.parse(trimmed) : undefined;
                }, z.array(z.string()).optional())
                .default([]),
            level: z.enum(leetcodeLevelTypeValues),
            solutions: z.preprocess((value) => {
                if (typeof value !== 'string') {
                    return value;
                }

                const trimmed = value.trim();
                return trimmed ? JSON.parse(trimmed) : undefined;
            }, z.array(LeetcodeSolutionCreateRequestDto.getSchema().omit({ problem: true })).optional()),
        })
        .strict(),
) {}

/** 更新 LeetCode 题目请求 DTO，至少需要提交一个可更新字段。 */
export class LeetcodeProblemUpdateRequestDto extends createZodModel(
    LeetcodeProblemCreateRequestDto.getSchema()
        .omit({ solutions: true })
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建 LeetCode 题目请求 DTO。 */
export class LeetcodeProblemBatchCreateRequestDto extends createZodModel(
    z.array(LeetcodeProblemCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新 LeetCode 题目请求 DTO。 */
export class LeetcodeProblemBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: LeetcodeProblemCreateRequestDto.getSchema()
            .omit({ solutions: true })
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** 按题目名称查询的路径参数请求 DTO。 */
export class LeetcodeNameParamsRequestDto extends createZodModel(
    z.object({ name: z.string().trim().min(1) }),
) {}

/** 按题目 slug 查询的路径参数请求 DTO。 */
export class LeetcodeSlugParamsRequestDto extends createZodModel(
    z.object({ slug: z.string().trim().min(1) }),
) {}

/** LeetCode 题目响应 DTO。 */
export class LeetcodeProblemResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        url: z.string(),
        desc: z.string(),
        tags: z.array(z.string()).optional().nullable(),
        level: z.enum(leetcodeLevelTypeValues),
        solutions: z.array(LeetcodeSolutionResponseDto.getSchema()).optional(),
    }),
) {}

/** LeetCode 题目列表响应 DTO。 */
export class LeetcodeProblemListResponseDto extends createZodModel(
    z.array(LeetcodeProblemResponseDto.getSchema()),
) {}

/** LeetCode 题目分页响应 DTO。 */
export class LeetcodeProblemPageResponseDto extends createZodModel(
    PageData.schema(LeetcodeProblemResponseDto.getSchema()),
) {}

/** 批量创建 LeetCode 题目响应 DTO。 */
export class LeetcodeProblemBatchCreateResponseDto extends createZodModel(
    z.array(LeetcodeProblemResponseDto.getSchema()),
) {}

/** LeetCode 题目 XLSX 新增导入响应 DTO。 */
export class LeetcodeProblemImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(LeetcodeProblemResponseDto.getSchema()),
    }),
) {}

/** LeetCode 题目 XLSX 更新导入响应 DTO。 */
export class LeetcodeProblemImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** LeetCode 题目 XLSX 导出响应 DTO。 */
export class LeetcodeProblemExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** LeetCode 题目写操作响应 DTO。 */
export class LeetcodeProblemWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 按 slug 查询 LeetCode 题目的响应 DTO。 */
export class LeetcodeProblemBySlugResponseDto extends createZodModel(z.looseObject({})) {}

/** 前端消费的 LeetCode 题目 DTO，包含题解列表。 */
export type LeetcodeProblem = z.output<ReturnType<typeof LeetcodeProblemResponseDto.getSchema>>;

/** LeetCode 题目资源的 XLSX 导入导出配置。 */
export const leetcodeProblemResourceSchema = {
    resourceName: 'leetcode-problem',
    createSchema: LeetcodeProblemCreateRequestDto.getSchema(),
    updateSchema: LeetcodeProblemCreateRequestDto.getSchema().omit({ solutions: true }).partial(),
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

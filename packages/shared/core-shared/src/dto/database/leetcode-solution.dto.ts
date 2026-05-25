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
import { leetcodeScriptTypeValues } from './enums';

/** LeetCode 题解分页查询请求 DTO。 */
export class LeetcodeSolutionPageRequestDto extends createZodModel(
    DatabasePageRequestDto.getSchema(),
) {}

/** 创建 LeetCode 题解请求 DTO。 */
export class LeetcodeSolutionCreateRequestDto extends createZodModel(
    z
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
        .strict(),
) {}

/** 更新 LeetCode 题解请求 DTO，至少需要提交一个可更新字段。 */
export class LeetcodeSolutionUpdateRequestDto extends createZodModel(
    LeetcodeSolutionCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建 LeetCode 题解请求 DTO。 */
export class LeetcodeSolutionBatchCreateRequestDto extends createZodModel(
    z.array(LeetcodeSolutionCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新 LeetCode 题解请求 DTO。 */
export class LeetcodeSolutionBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: LeetcodeSolutionCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** LeetCode 题解响应 DTO。 */
export class LeetcodeSolutionResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        script: z.enum(leetcodeScriptTypeValues),
        date: dateValueSchema,
        time: z.number().optional().nullable(),
        memory: z.number().optional().nullable(),
        desc: z.string(),
        code: z.string(),
        problem: z.unknown().optional(),
    }),
) {}

/** LeetCode 题解列表响应 DTO。 */
export class LeetcodeSolutionListResponseDto extends createZodModel(
    z.array(LeetcodeSolutionResponseDto.getSchema()),
) {}

/** LeetCode 题解分页响应 DTO。 */
export class LeetcodeSolutionPageResponseDto extends createZodModel(
    PageData.schema(LeetcodeSolutionResponseDto.getSchema()),
) {}

/** 批量创建 LeetCode 题解响应 DTO。 */
export class LeetcodeSolutionBatchCreateResponseDto extends createZodModel(
    z.array(LeetcodeSolutionResponseDto.getSchema()),
) {}

/** LeetCode 题解 XLSX 新增导入响应 DTO。 */
export class LeetcodeSolutionImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(LeetcodeSolutionResponseDto.getSchema()),
    }),
) {}

/** LeetCode 题解 XLSX 更新导入响应 DTO。 */
export class LeetcodeSolutionImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** LeetCode 题解 XLSX 导出响应 DTO。 */
export class LeetcodeSolutionExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** LeetCode 题解写操作响应 DTO。 */
export class LeetcodeSolutionWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 前端消费的 LeetCode 题解 DTO。 */
export type LeetcodeSolution = z.output<ReturnType<typeof LeetcodeSolutionResponseDto.getSchema>>;

/** LeetCode 题解资源的 XLSX 导入导出配置。 */
export const leetcodeSolutionResourceSchema = {
    resourceName: 'leetcode-solution',
    createSchema: LeetcodeSolutionCreateRequestDto.getSchema(),
    updateSchema: LeetcodeSolutionCreateRequestDto.getSchema().partial(),
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

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

export class LeetcodeSolutionPageRequestDto extends createZodModel(
    DatabasePageRequestDto.getSchema(),
) {}

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

export class LeetcodeSolutionUpdateRequestDto extends createZodModel(
    LeetcodeSolutionCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class LeetcodeSolutionBatchCreateRequestDto extends createZodModel(
    z.array(LeetcodeSolutionCreateRequestDto.getSchema()).min(1),
) {}

export class LeetcodeSolutionBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: LeetcodeSolutionCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

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

export class LeetcodeSolutionListResponseDto extends createZodModel(
    z.array(LeetcodeSolutionResponseDto.getSchema()),
) {}

export class LeetcodeSolutionPageResponseDto extends createZodModel(
    PageData.schema(LeetcodeSolutionResponseDto.getSchema()),
) {}

export class LeetcodeSolutionBatchCreateResponseDto extends createZodModel(
    z.array(LeetcodeSolutionResponseDto.getSchema()),
) {}

export class LeetcodeSolutionImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(LeetcodeSolutionResponseDto.getSchema()),
    }),
) {}

export class LeetcodeSolutionImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class LeetcodeSolutionExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class LeetcodeSolutionWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 前端消费的 LeetCode 题解 DTO。 */
export type LeetcodeSolution = z.output<ReturnType<typeof LeetcodeSolutionResponseDto.getSchema>>;

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

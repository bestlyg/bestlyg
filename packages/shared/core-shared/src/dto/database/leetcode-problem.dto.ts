import { createZodModel } from '../../zod';
import { z } from 'zod';
import {
    baseEntityResponse,
    batchUpdateBodySchema,
    databaseImportUpdateResponse,
    databasePageRequest,
    databaseWriteResponse,
    databaseXlsxExportResponse,
    DatabaseResourceSchema,
    enumSchema,
    importCreateResponse,
    jsonCell,
    jsonSchema,
    nonEmptyObject,
    pageResponse,
    requiredStringSchema,
    withBaseColumns,
} from './common.dto';
import { leetcodeLevelTypeValues } from './enums';
import { leetcodeSolutionCreateRequest, leetcodeSolutionResponse } from './leetcode-solution.dto';

export const leetcodeProblemCreateRequest = z
    .object({
        name: requiredStringSchema,
        url: requiredStringSchema,
        desc: requiredStringSchema,
        tags: jsonSchema(z.array(z.string())).default([]),
        level: enumSchema(leetcodeLevelTypeValues),
        solutions: jsonSchema(
            z.array(leetcodeSolutionCreateRequest.omit({ problem: true })),
        ).optional(),
    })
    .strict();
export const leetcodeProblemUpdateRequest = leetcodeProblemCreateRequest
    .omit({ solutions: true })
    .partial();
export const leetcodeProblemUpdateBodyRequest = nonEmptyObject(
    leetcodeProblemUpdateRequest,
    'body',
);
export const leetcodeProblemBatchCreateRequest = z.array(leetcodeProblemCreateRequest).min(1);
export const leetcodeProblemBatchUpdateRequest = batchUpdateBodySchema(
    leetcodeProblemUpdateRequest,
);
export const leetcodeProblemPageRequest = databasePageRequest;
export const leetcodeNameParamsRequest = z.object({ name: requiredStringSchema });
export const leetcodeSlugParamsRequest = z.object({ slug: requiredStringSchema });

export const leetcodeProblemResponse = baseEntityResponse
    .extend({
        name: z.string(),
        url: z.string(),
        desc: z.string(),
        tags: z.array(z.string()).optional().nullable(),
        level: enumSchema(leetcodeLevelTypeValues),
        solutions: z.array(leetcodeSolutionResponse).optional(),
    })
    .loose();
export const leetcodeProblemListResponse = z.array(leetcodeProblemResponse);
export const leetcodeProblemPageResponse = pageResponse(leetcodeProblemResponse);
export const leetcodeProblemBatchCreateResponse = z.array(leetcodeProblemResponse);
export const leetcodeProblemImportResponse = importCreateResponse(leetcodeProblemResponse);
export const leetcodeProblemImportUpdateResponse = databaseImportUpdateResponse;
export const leetcodeProblemExportResponse = databaseXlsxExportResponse;
export const leetcodeProblemWriteResponse = databaseWriteResponse;
export const leetcodeProblemBySlugResponse = z.looseObject({});

export class LeetcodeProblemPageRequestDto extends createZodModel(leetcodeProblemPageRequest) {}
export class LeetcodeProblemCreateRequestDto extends createZodModel(leetcodeProblemCreateRequest) {}
export class LeetcodeProblemUpdateRequestDto extends createZodModel(
    leetcodeProblemUpdateBodyRequest,
) {}
export class LeetcodeProblemBatchCreateRequestDto extends createZodModel(
    leetcodeProblemBatchCreateRequest,
) {}
export class LeetcodeProblemBatchUpdateRequestDto extends createZodModel(
    leetcodeProblemBatchUpdateRequest,
) {}
export class LeetcodeNameParamsRequestDto extends createZodModel(leetcodeNameParamsRequest) {}
export class LeetcodeSlugParamsRequestDto extends createZodModel(leetcodeSlugParamsRequest) {}

export class LeetcodeProblemResponseDto extends createZodModel(leetcodeProblemResponse) {}
export class LeetcodeProblemListResponseDto extends createZodModel(leetcodeProblemListResponse) {}
export class LeetcodeProblemPageResponseDto extends createZodModel(leetcodeProblemPageResponse) {}
export class LeetcodeProblemBatchCreateResponseDto extends createZodModel(
    leetcodeProblemBatchCreateResponse,
) {}
export class LeetcodeProblemImportResponseDto extends createZodModel(
    leetcodeProblemImportResponse,
) {}
export class LeetcodeProblemImportUpdateResponseDto extends createZodModel(
    leetcodeProblemImportUpdateResponse,
) {}
export class LeetcodeProblemExportResponseDto extends createZodModel(
    leetcodeProblemExportResponse,
) {}
export class LeetcodeProblemWriteResponseDto extends createZodModel(leetcodeProblemWriteResponse) {}
export class LeetcodeProblemBySlugResponseDto extends createZodModel(
    leetcodeProblemBySlugResponse,
) {}

export const leetcodeProblemResourceSchema = {
    resourceName: 'leetcode-problem',
    createSchema: leetcodeProblemCreateRequest,
    updateSchema: leetcodeProblemUpdateRequest,
    xlsxColumns: withBaseColumns([
        { key: 'name', width: 32 },
        { key: 'url', width: 48 },
        { key: 'desc', width: 48 },
        { key: 'tags', width: 32, format: jsonCell },
        { key: 'level' },
        { key: 'solutions', width: 48, format: jsonCell },
    ]),
} satisfies DatabaseResourceSchema<any, any, any>;

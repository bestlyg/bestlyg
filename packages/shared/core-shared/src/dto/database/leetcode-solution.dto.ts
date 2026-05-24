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
    dateSchema,
    enumSchema,
    idSchema,
    importCreateResponse,
    jsonCell,
    nonEmptyObject,
    optionalNumberSchema,
    pageResponse,
    requiredStringSchema,
    withBaseColumns,
} from './common.dto';
import { leetcodeScriptTypeValues } from './enums';

export const leetcodeSolutionCreateRequest = z
    .object({
        script: enumSchema(leetcodeScriptTypeValues),
        date: dateSchema,
        time: optionalNumberSchema,
        memory: optionalNumberSchema,
        desc: requiredStringSchema,
        code: requiredStringSchema,
        problem: z.object({ id: idSchema }).optional(),
    })
    .strict();
export const leetcodeSolutionUpdateRequest = leetcodeSolutionCreateRequest.partial();
export const leetcodeSolutionUpdateBodyRequest = nonEmptyObject(
    leetcodeSolutionUpdateRequest,
    'body',
);
export const leetcodeSolutionBatchCreateRequest = z.array(leetcodeSolutionCreateRequest).min(1);
export const leetcodeSolutionBatchUpdateRequest = batchUpdateBodySchema(
    leetcodeSolutionUpdateRequest,
);
export const leetcodeSolutionPageRequest = databasePageRequest;

export const leetcodeSolutionResponse = baseEntityResponse
    .extend({
        script: enumSchema(leetcodeScriptTypeValues),
        date: dateSchema,
        time: z.number().optional().nullable(),
        memory: z.number().optional().nullable(),
        desc: z.string(),
        code: z.string(),
        problem: z.unknown().optional(),
    })
    .passthrough();
export const leetcodeSolutionListResponse = z.array(leetcodeSolutionResponse);
export const leetcodeSolutionPageResponse = pageResponse(leetcodeSolutionResponse);
export const leetcodeSolutionBatchCreateResponse = z.array(leetcodeSolutionResponse);
export const leetcodeSolutionImportResponse = importCreateResponse(leetcodeSolutionResponse);
export const leetcodeSolutionImportUpdateResponse = databaseImportUpdateResponse;
export const leetcodeSolutionExportResponse = databaseXlsxExportResponse;
export const leetcodeSolutionWriteResponse = databaseWriteResponse;

export class LeetcodeSolutionPageRequestDto extends createZodModel(leetcodeSolutionPageRequest) {}
export class LeetcodeSolutionCreateRequestDto extends createZodModel(
    leetcodeSolutionCreateRequest,
) {}
export class LeetcodeSolutionUpdateRequestDto extends createZodModel(
    leetcodeSolutionUpdateBodyRequest,
) {}
export class LeetcodeSolutionBatchCreateRequestDto extends createZodModel(
    leetcodeSolutionBatchCreateRequest,
) {}
export class LeetcodeSolutionBatchUpdateRequestDto extends createZodModel(
    leetcodeSolutionBatchUpdateRequest,
) {}

export class LeetcodeSolutionResponseDto extends createZodModel(leetcodeSolutionResponse) {}
export class LeetcodeSolutionListResponseDto extends createZodModel(leetcodeSolutionListResponse) {}
export class LeetcodeSolutionPageResponseDto extends createZodModel(leetcodeSolutionPageResponse) {}
export class LeetcodeSolutionBatchCreateResponseDto extends createZodModel(
    leetcodeSolutionBatchCreateResponse,
) {}
export class LeetcodeSolutionImportResponseDto extends createZodModel(
    leetcodeSolutionImportResponse,
) {}
export class LeetcodeSolutionImportUpdateResponseDto extends createZodModel(
    leetcodeSolutionImportUpdateResponse,
) {}
export class LeetcodeSolutionExportResponseDto extends createZodModel(
    leetcodeSolutionExportResponse,
) {}
export class LeetcodeSolutionWriteResponseDto extends createZodModel(
    leetcodeSolutionWriteResponse,
) {}

export const leetcodeSolutionResourceSchema = {
    resourceName: 'leetcode-solution',
    createSchema: leetcodeSolutionCreateRequest,
    updateSchema: leetcodeSolutionUpdateRequest,
    xlsxColumns: withBaseColumns([
        { key: 'script' },
        { key: 'date', width: 20 },
        { key: 'time' },
        { key: 'memory' },
        { key: 'desc', width: 48 },
        { key: 'code', width: 60 },
        { key: 'problem', width: 38, format: jsonCell },
    ]),
} satisfies DatabaseResourceSchema<any, any, any>;

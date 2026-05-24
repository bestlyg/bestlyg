import { createZodModel } from '../../zod';
import { z } from 'zod';
import {
    baseEntityResponse,
    batchUpdateBodySchema,
    databaseImportUpdateResponse,
    databaseWriteResponse,
    databaseXlsxExportResponse,
    DatabaseResourceSchema,
    importCreateResponse,
    nonEmptyObject,
    pageResponse,
    databasePageRequest,
    requiredStringSchema,
    withBaseColumns,
} from './common.dto';

export const casbinRuleCreateRequest = z
    .object({
        ptype: requiredStringSchema,
        p0: requiredStringSchema,
        p1: requiredStringSchema,
        p2: requiredStringSchema,
        p3: requiredStringSchema,
        p4: requiredStringSchema,
        p5: requiredStringSchema,
    })
    .strict();
export const casbinRuleUpdateRequest = casbinRuleCreateRequest.partial();
export const casbinRuleUpdateBodyRequest = nonEmptyObject(casbinRuleUpdateRequest, 'body');
export const casbinRuleBatchCreateRequest = z.array(casbinRuleCreateRequest).min(1);
export const casbinRuleBatchUpdateRequest = batchUpdateBodySchema(casbinRuleUpdateRequest);
export const casbinRulePageRequest = databasePageRequest;

export const casbinRuleResponse = baseEntityResponse
    .extend({
        ptype: z.string(),
        p0: z.string(),
        p1: z.string(),
        p2: z.string(),
        p3: z.string(),
        p4: z.string(),
        p5: z.string(),
    })
    .loose();
export const casbinRuleListResponse = z.array(casbinRuleResponse);
export const casbinRulePageResponse = pageResponse(casbinRuleResponse);
export const casbinRuleBatchCreateResponse = z.array(casbinRuleResponse);
export const casbinRuleImportResponse = importCreateResponse(casbinRuleResponse);
export const casbinRuleImportUpdateResponse = databaseImportUpdateResponse;
export const casbinRuleExportResponse = databaseXlsxExportResponse;
export const casbinRuleWriteResponse = databaseWriteResponse;

export class CasbinRulePageRequestDto extends createZodModel(casbinRulePageRequest) {}
export class CasbinRuleCreateRequestDto extends createZodModel(casbinRuleCreateRequest) {}
export class CasbinRuleUpdateRequestDto extends createZodModel(casbinRuleUpdateBodyRequest) {}
export class CasbinRuleBatchCreateRequestDto extends createZodModel(casbinRuleBatchCreateRequest) {}
export class CasbinRuleBatchUpdateRequestDto extends createZodModel(casbinRuleBatchUpdateRequest) {}

export class CasbinRuleResponseDto extends createZodModel(casbinRuleResponse) {}
export class CasbinRuleListResponseDto extends createZodModel(casbinRuleListResponse) {}
export class CasbinRulePageResponseDto extends createZodModel(casbinRulePageResponse) {}
export class CasbinRuleBatchCreateResponseDto extends createZodModel(
    casbinRuleBatchCreateResponse,
) {}
export class CasbinRuleImportResponseDto extends createZodModel(casbinRuleImportResponse) {}
export class CasbinRuleImportUpdateResponseDto extends createZodModel(
    casbinRuleImportUpdateResponse,
) {}
export class CasbinRuleExportResponseDto extends createZodModel(casbinRuleExportResponse) {}
export class CasbinRuleWriteResponseDto extends createZodModel(casbinRuleWriteResponse) {}

export const casbinRuleResourceSchema = {
    resourceName: 'casbin-rule',
    createSchema: casbinRuleCreateRequest,
    updateSchema: casbinRuleUpdateRequest,
    xlsxColumns: withBaseColumns([
        { key: 'ptype' },
        { key: 'p0' },
        { key: 'p1' },
        { key: 'p2' },
        { key: 'p3' },
        { key: 'p4' },
        { key: 'p5' },
    ]),
} satisfies DatabaseResourceSchema<any, any, any>;

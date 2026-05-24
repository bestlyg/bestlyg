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
    importCreateResponse,
    nonEmptyObject,
    pageResponse,
    requiredStringSchema,
    withBaseColumns,
} from './common.dto';

export const secretsCreateRequest = z
    .object({
        name: requiredStringSchema,
        data: requiredStringSchema,
    })
    .strict();
export const secretsUpdateRequest = secretsCreateRequest.partial();
export const secretsUpdateBodyRequest = nonEmptyObject(secretsUpdateRequest, 'body');
export const secretsBatchCreateRequest = z.array(secretsCreateRequest).min(1);
export const secretsBatchUpdateRequest = batchUpdateBodySchema(secretsUpdateRequest);
export const secretsPageRequest = databasePageRequest;

export const secretsResponse = baseEntityResponse
    .extend({
        name: z.string(),
        data: z.string(),
    })
    .passthrough();
export const secretsListResponse = z.array(secretsResponse);
export const secretsPageResponse = pageResponse(secretsResponse);
export const secretsBatchCreateResponse = z.array(secretsResponse);
export const secretsImportResponse = importCreateResponse(secretsResponse);
export const secretsImportUpdateResponse = databaseImportUpdateResponse;
export const secretsExportResponse = databaseXlsxExportResponse;
export const secretsWriteResponse = databaseWriteResponse;

export class SecretsPageRequestDto extends createZodModel(secretsPageRequest) {}
export class SecretsCreateRequestDto extends createZodModel(secretsCreateRequest) {}
export class SecretsUpdateRequestDto extends createZodModel(secretsUpdateBodyRequest) {}
export class SecretsBatchCreateRequestDto extends createZodModel(secretsBatchCreateRequest) {}
export class SecretsBatchUpdateRequestDto extends createZodModel(secretsBatchUpdateRequest) {}

export class SecretsResponseDto extends createZodModel(secretsResponse) {}
export class SecretsListResponseDto extends createZodModel(secretsListResponse) {}
export class SecretsPageResponseDto extends createZodModel(secretsPageResponse) {}
export class SecretsBatchCreateResponseDto extends createZodModel(secretsBatchCreateResponse) {}
export class SecretsImportResponseDto extends createZodModel(secretsImportResponse) {}
export class SecretsImportUpdateResponseDto extends createZodModel(secretsImportUpdateResponse) {}
export class SecretsExportResponseDto extends createZodModel(secretsExportResponse) {}
export class SecretsWriteResponseDto extends createZodModel(secretsWriteResponse) {}

export const secretsResourceSchema = {
    resourceName: 'secrets',
    createSchema: secretsCreateRequest,
    updateSchema: secretsUpdateRequest,
    xlsxColumns: withBaseColumns([{ key: 'name' }, { key: 'data', width: 48 }]),
} satisfies DatabaseResourceSchema<any, any, any>;

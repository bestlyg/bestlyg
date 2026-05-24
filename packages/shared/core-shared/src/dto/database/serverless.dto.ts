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

export const serverlessCreateRequest = z
    .object({
        name: requiredStringSchema,
        code: requiredStringSchema,
    })
    .strict();
export const serverlessUpdateRequest = serverlessCreateRequest.partial();
export const serverlessUpdateBodyRequest = nonEmptyObject(serverlessUpdateRequest, 'body');
export const serverlessBatchCreateRequest = z.array(serverlessCreateRequest).min(1);
export const serverlessBatchUpdateRequest = batchUpdateBodySchema(serverlessUpdateRequest);
export const serverlessPageRequest = databasePageRequest;

export const serverlessResponse = baseEntityResponse
    .extend({
        name: z.string(),
        code: z.string(),
    })
    .passthrough();
export const serverlessListResponse = z.array(serverlessResponse);
export const serverlessPageResponse = pageResponse(serverlessResponse);
export const serverlessBatchCreateResponse = z.array(serverlessResponse);
export const serverlessImportResponse = importCreateResponse(serverlessResponse);
export const serverlessImportUpdateResponse = databaseImportUpdateResponse;
export const serverlessExportResponse = databaseXlsxExportResponse;
export const serverlessWriteResponse = databaseWriteResponse;

export class ServerlessPageRequestDto extends createZodModel(serverlessPageRequest) {}
export class ServerlessCreateRequestDto extends createZodModel(serverlessCreateRequest) {}
export class ServerlessUpdateRequestDto extends createZodModel(serverlessUpdateBodyRequest) {}
export class ServerlessBatchCreateRequestDto extends createZodModel(serverlessBatchCreateRequest) {}
export class ServerlessBatchUpdateRequestDto extends createZodModel(serverlessBatchUpdateRequest) {}

export class ServerlessResponseDto extends createZodModel(serverlessResponse) {}
export class ServerlessListResponseDto extends createZodModel(serverlessListResponse) {}
export class ServerlessPageResponseDto extends createZodModel(serverlessPageResponse) {}
export class ServerlessBatchCreateResponseDto extends createZodModel(
    serverlessBatchCreateResponse,
) {}
export class ServerlessImportResponseDto extends createZodModel(serverlessImportResponse) {}
export class ServerlessImportUpdateResponseDto extends createZodModel(
    serverlessImportUpdateResponse,
) {}
export class ServerlessExportResponseDto extends createZodModel(serverlessExportResponse) {}
export class ServerlessWriteResponseDto extends createZodModel(serverlessWriteResponse) {}

export const serverlessResourceSchema = {
    resourceName: 'serverless',
    createSchema: serverlessCreateRequest,
    updateSchema: serverlessUpdateRequest,
    xlsxColumns: withBaseColumns([{ key: 'name' }, { key: 'code', width: 60 }]),
} satisfies DatabaseResourceSchema<any, any, any>;

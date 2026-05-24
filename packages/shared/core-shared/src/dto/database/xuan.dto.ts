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
    importCreateResponse,
    nonEmptyObject,
    optionalIntSchema,
    pageResponse,
    withBaseColumns,
} from './common.dto';

export const xuanCreateRequest = z
    .object({
        date: dateSchema,
        weight: optionalIntSchema,
        dance_times: optionalIntSchema,
    })
    .strict();
export const xuanUpdateRequest = xuanCreateRequest.partial();
export const xuanUpdateBodyRequest = nonEmptyObject(xuanUpdateRequest, 'body');
export const xuanBatchCreateRequest = z.array(xuanCreateRequest).min(1);
export const xuanBatchUpdateRequest = batchUpdateBodySchema(xuanUpdateRequest);
export const xuanPageRequest = databasePageRequest;

export const xuanResponse = baseEntityResponse
    .extend({
        date: dateSchema,
        weight: z.number().int().optional().nullable(),
        dance_times: z.number().int().optional().nullable(),
    })
    .loose();
export const xuanListResponse = z.array(xuanResponse);
export const xuanPageResponse = pageResponse(xuanResponse);
export const xuanBatchCreateResponse = z.array(xuanResponse);
export const xuanImportResponse = importCreateResponse(xuanResponse);
export const xuanImportUpdateResponse = databaseImportUpdateResponse;
export const xuanExportResponse = databaseXlsxExportResponse;
export const xuanWriteResponse = databaseWriteResponse;

export class XuanPageRequestDto extends createZodModel(xuanPageRequest) {}
export class XuanCreateRequestDto extends createZodModel(xuanCreateRequest) {}
export class XuanUpdateRequestDto extends createZodModel(xuanUpdateBodyRequest) {}
export class XuanBatchCreateRequestDto extends createZodModel(xuanBatchCreateRequest) {}
export class XuanBatchUpdateRequestDto extends createZodModel(xuanBatchUpdateRequest) {}

export class XuanResponseDto extends createZodModel(xuanResponse) {}
export class XuanListResponseDto extends createZodModel(xuanListResponse) {}
export class XuanPageResponseDto extends createZodModel(xuanPageResponse) {}
export class XuanBatchCreateResponseDto extends createZodModel(xuanBatchCreateResponse) {}
export class XuanImportResponseDto extends createZodModel(xuanImportResponse) {}
export class XuanImportUpdateResponseDto extends createZodModel(xuanImportUpdateResponse) {}
export class XuanExportResponseDto extends createZodModel(xuanExportResponse) {}
export class XuanWriteResponseDto extends createZodModel(xuanWriteResponse) {}

export const xuanResourceSchema = {
    resourceName: 'xuan',
    createSchema: xuanCreateRequest,
    updateSchema: xuanUpdateRequest,
    xlsxColumns: withBaseColumns([
        { key: 'date', width: 20 },
        { key: 'weight' },
        { key: 'dance_times' },
    ]),
} satisfies DatabaseResourceSchema<any, any, any>;

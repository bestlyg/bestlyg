import { createZodModel } from '../../zod';
import { z } from 'zod';
import {
    baseEntityResponse,
    batchUpdateBodySchema,
    booleanSchema,
    databaseImportUpdateResponse,
    databaseWriteResponse,
    databaseXlsxExportResponse,
    DatabaseResourceSchema,
    dateSchema,
    enumSchema,
    importCreateResponse,
    intSchema,
    nonEmptyObject,
    optionalEnumSchema,
    optionalStringSchema,
    pageQueryFields,
    pageResponse,
    requiredStringSchema,
    withBaseColumns,
} from './common.dto';
import { ledgerFromValues, ledgerTypeValues } from './enums';

export const ledgerQueryRequest = z
    .object({
        date: z.string().min(1).optional(),
    })
    .strip();
export const ledgerPageRequest = ledgerQueryRequest.extend(pageQueryFields).strip();
export const ledgerExportRequest = ledgerQueryRequest;
export const ledgerCreateRequest = z
    .object({
        date: dateSchema,
        balance: intSchema,
        comment: requiredStringSchema,
        io: booleanSchema(),
        from: optionalEnumSchema(ledgerFromValues),
        bank: optionalStringSchema,
        type: enumSchema(ledgerTypeValues),
    })
    .strict();
export const ledgerUpdateRequest = ledgerCreateRequest.partial();
export const ledgerUpdateBodyRequest = nonEmptyObject(ledgerUpdateRequest, 'body');
export const ledgerBatchCreateRequest = z.array(ledgerCreateRequest).min(1);
export const ledgerBatchUpdateRequest = batchUpdateBodySchema(ledgerUpdateRequest);

export const ledgerResponse = baseEntityResponse
    .extend({
        date: dateSchema,
        balance: z.number().int(),
        comment: z.string(),
        io: z.boolean(),
        from: enumSchema(ledgerFromValues).optional().nullable(),
        bank: z.string().optional().nullable(),
        type: enumSchema(ledgerTypeValues),
    })
    .passthrough();
export const ledgerListResponse = z.array(ledgerResponse);
export const ledgerPageResponse = pageResponse(ledgerResponse);
export const ledgerBatchCreateResponse = z.array(ledgerResponse);
export const ledgerImportResponse = importCreateResponse(ledgerResponse);
export const ledgerImportUpdateResponse = databaseImportUpdateResponse;
export const ledgerExportResponse = databaseXlsxExportResponse;
export const ledgerWriteResponse = databaseWriteResponse;

export class LedgerQueryRequestDto extends createZodModel(ledgerQueryRequest) {}
export class LedgerPageRequestDto extends createZodModel(ledgerPageRequest) {}
export class LedgerExportRequestDto extends createZodModel(ledgerExportRequest) {}
export class LedgerCreateRequestDto extends createZodModel(ledgerCreateRequest) {}
export class LedgerUpdateRequestDto extends createZodModel(ledgerUpdateBodyRequest) {}
export class LedgerBatchCreateRequestDto extends createZodModel(ledgerBatchCreateRequest) {}
export class LedgerBatchUpdateRequestDto extends createZodModel(ledgerBatchUpdateRequest) {}

export class LedgerResponseDto extends createZodModel(ledgerResponse) {}
export class LedgerListResponseDto extends createZodModel(ledgerListResponse) {}
export class LedgerPageResponseDto extends createZodModel(ledgerPageResponse) {}
export class LedgerBatchCreateResponseDto extends createZodModel(ledgerBatchCreateResponse) {}
export class LedgerImportResponseDto extends createZodModel(ledgerImportResponse) {}
export class LedgerImportUpdateResponseDto extends createZodModel(ledgerImportUpdateResponse) {}
export class LedgerExportResponseDto extends createZodModel(ledgerExportResponse) {}
export class LedgerWriteResponseDto extends createZodModel(ledgerWriteResponse) {}

export const ledgerResourceSchema = {
    resourceName: 'ledger',
    createSchema: ledgerCreateRequest,
    updateSchema: ledgerUpdateRequest,
    xlsxColumns: withBaseColumns([
        { key: 'date', width: 20 },
        { key: 'balance' },
        { key: 'comment', width: 30 },
        { key: 'io' },
        { key: 'from' },
        { key: 'bank' },
        { key: 'type', width: 20 },
    ]),
} satisfies DatabaseResourceSchema<any, any, any>;

import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    LedgerBatchCreateRequestDto,
    LedgerBatchCreateResponseDto,
    LedgerBatchUpdateRequestDto,
    LedgerCreateRequestDto,
    LedgerExportRequestDto,
    LedgerImportResponseDto,
    LedgerImportUpdateResponseDto,
    LedgerListResponseDto,
    LedgerPageRequestDto,
    LedgerPageResponseDto,
    LedgerQueryRequestDto,
    LedgerResponseDto,
    LedgerUpdateRequestDto,
    LedgerWriteResponseDto,
} from '@bestlyg/core-shared';

const ledgerControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/ledger',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/ledger/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/ledger/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/ledger/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/ledger',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/ledger/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/ledger/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/ledger/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/ledger/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/ledger/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/ledger/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/ledger/{id}',
    },
} as const;

export type LedgerFindListApiRequest = LedgerQueryRequestDto;
export type LedgerFindListApiResponse = LedgerListResponseDto;
export async function ledgerFindList(
    input?: LedgerFindListApiRequest,
): Promise<LedgerFindListApiResponse | null> {
    return callApi<LedgerFindListApiResponse>({
        endpoint: ledgerControllerApiMap.findList,
        query: input as any,
    });
}

export type LedgerFindPageAndCountApiRequest = LedgerPageRequestDto;
export type LedgerFindPageAndCountApiResponse = LedgerPageResponseDto;
export async function ledgerFindPageAndCount(
    input: LedgerFindPageAndCountApiRequest,
): Promise<LedgerFindPageAndCountApiResponse | null> {
    return callApi<LedgerFindPageAndCountApiResponse>({
        endpoint: ledgerControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type LedgerExportXlsxApiRequest = LedgerExportRequestDto;
export type LedgerExportXlsxApiResponse = Blob;
export async function ledgerExportXlsx(
    input?: LedgerExportXlsxApiRequest,
): Promise<LedgerExportXlsxApiResponse | null> {
    return callApi<LedgerExportXlsxApiResponse>({
        endpoint: ledgerControllerApiMap.exportXlsx,
        query: input as any,
        responseType: 'blob',
    });
}

export type LedgerFindOneApiRequest = DatabaseIdParamsRequestDto;
export type LedgerFindOneApiResponse = LedgerResponseDto;
export async function ledgerFindOne(
    input: LedgerFindOneApiRequest,
): Promise<LedgerFindOneApiResponse | null> {
    return callApi<LedgerFindOneApiResponse>({
        endpoint: ledgerControllerApiMap.findOne,
        params: input as any,
    });
}

export type LedgerSaveApiRequest = LedgerCreateRequestDto;
export type LedgerSaveApiResponse = LedgerResponseDto;
export async function ledgerSave(
    input: LedgerSaveApiRequest,
): Promise<LedgerSaveApiResponse | null> {
    return callApi<LedgerSaveApiResponse>({
        endpoint: ledgerControllerApiMap.save,
        body: input,
    });
}

export type LedgerSaveBatchApiRequest = LedgerBatchCreateRequestDto;
export type LedgerSaveBatchApiResponse = LedgerBatchCreateResponseDto;
export async function ledgerSaveBatch(
    input: LedgerSaveBatchApiRequest,
): Promise<LedgerSaveBatchApiResponse | null> {
    return callApi<LedgerSaveBatchApiResponse>({
        endpoint: ledgerControllerApiMap.saveBatch,
        body: input,
    });
}

export type LedgerImportUpdateXlsxApiRequest = FormData;
export type LedgerImportUpdateXlsxApiResponse = LedgerImportUpdateResponseDto;
export async function ledgerImportUpdateXlsx(
    input: LedgerImportUpdateXlsxApiRequest,
): Promise<LedgerImportUpdateXlsxApiResponse | null> {
    return callApi<LedgerImportUpdateXlsxApiResponse>({
        endpoint: ledgerControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type LedgerImportXlsxApiRequest = FormData;
export type LedgerImportXlsxApiResponse = LedgerImportResponseDto;
export async function ledgerImportXlsx(
    input: LedgerImportXlsxApiRequest,
): Promise<LedgerImportXlsxApiResponse | null> {
    return callApi<LedgerImportXlsxApiResponse>({
        endpoint: ledgerControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type LedgerUpdateBatchApiRequest = LedgerBatchUpdateRequestDto;
export type LedgerUpdateBatchApiResponse = LedgerWriteResponseDto;
export async function ledgerUpdateBatch(
    input: LedgerUpdateBatchApiRequest,
): Promise<LedgerUpdateBatchApiResponse | null> {
    return callApi<LedgerUpdateBatchApiResponse>({
        endpoint: ledgerControllerApiMap.updateBatch,
        body: input,
    });
}

export type LedgerUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: LedgerUpdateRequestDto;
};
export type LedgerUpdateApiResponse = LedgerWriteResponseDto;
export async function ledgerUpdate(
    input: LedgerUpdateApiRequest,
): Promise<LedgerUpdateApiResponse | null> {
    return callApi<LedgerUpdateApiResponse>({
        endpoint: ledgerControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type LedgerDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type LedgerDeleteBatchApiResponse = LedgerWriteResponseDto;
export async function ledgerDeleteBatch(
    input: LedgerDeleteBatchApiRequest,
): Promise<LedgerDeleteBatchApiResponse | null> {
    return callApi<LedgerDeleteBatchApiResponse>({
        endpoint: ledgerControllerApiMap.deleteBatch,
        body: input,
    });
}

export type LedgerDeleteApiRequest = DatabaseIdParamsRequestDto;
export type LedgerDeleteApiResponse = LedgerWriteResponseDto;
export async function ledgerDelete(
    input: LedgerDeleteApiRequest,
): Promise<LedgerDeleteApiResponse | null> {
    return callApi<LedgerDeleteApiResponse>({
        endpoint: ledgerControllerApiMap.delete,
        params: input as any,
    });
}

import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    LeetcodeSolutionBatchCreateRequestDto,
    LeetcodeSolutionBatchCreateResponseDto,
    LeetcodeSolutionBatchUpdateRequestDto,
    LeetcodeSolutionCreateRequestDto,
    LeetcodeSolutionImportResponseDto,
    LeetcodeSolutionImportUpdateResponseDto,
    LeetcodeSolutionListResponseDto,
    LeetcodeSolutionPageRequestDto,
    LeetcodeSolutionPageResponseDto,
    LeetcodeSolutionResponseDto,
    LeetcodeSolutionUpdateRequestDto,
    LeetcodeSolutionWriteResponseDto,
} from '@bestlyg/core-shared';

const leetcodeSolutionControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/leetcode-solution',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/leetcode-solution/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/leetcode-solution/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/leetcode-solution/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/leetcode-solution',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/leetcode-solution/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/leetcode-solution/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/leetcode-solution/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/leetcode-solution/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/leetcode-solution/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/leetcode-solution/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/leetcode-solution/{id}',
    },
} as const;

export type LeetcodeSolutionFindListApiRequest = void;
export type LeetcodeSolutionFindListApiResponse = LeetcodeSolutionListResponseDto;
export async function leetcodeSolutionFindList(): Promise<LeetcodeSolutionFindListApiResponse | null> {
    return callApi<LeetcodeSolutionFindListApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.findList,
    });
}

export type LeetcodeSolutionFindPageAndCountApiRequest = LeetcodeSolutionPageRequestDto;
export type LeetcodeSolutionFindPageAndCountApiResponse = LeetcodeSolutionPageResponseDto;
export async function leetcodeSolutionFindPageAndCount(
    input: LeetcodeSolutionFindPageAndCountApiRequest,
): Promise<LeetcodeSolutionFindPageAndCountApiResponse | null> {
    return callApi<LeetcodeSolutionFindPageAndCountApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type LeetcodeSolutionExportXlsxApiRequest = void;
export type LeetcodeSolutionExportXlsxApiResponse = Blob;
export async function leetcodeSolutionExportXlsx(): Promise<LeetcodeSolutionExportXlsxApiResponse | null> {
    return callApi<LeetcodeSolutionExportXlsxApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type LeetcodeSolutionFindOneApiRequest = DatabaseIdParamsRequestDto;
export type LeetcodeSolutionFindOneApiResponse = LeetcodeSolutionResponseDto;
export async function leetcodeSolutionFindOne(
    input: LeetcodeSolutionFindOneApiRequest,
): Promise<LeetcodeSolutionFindOneApiResponse | null> {
    return callApi<LeetcodeSolutionFindOneApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.findOne,
        params: input as any,
    });
}

export type LeetcodeSolutionSaveApiRequest = LeetcodeSolutionCreateRequestDto;
export type LeetcodeSolutionSaveApiResponse = LeetcodeSolutionResponseDto;
export async function leetcodeSolutionSave(
    input: LeetcodeSolutionSaveApiRequest,
): Promise<LeetcodeSolutionSaveApiResponse | null> {
    return callApi<LeetcodeSolutionSaveApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.save,
        body: input,
    });
}

export type LeetcodeSolutionSaveBatchApiRequest = LeetcodeSolutionBatchCreateRequestDto;
export type LeetcodeSolutionSaveBatchApiResponse = LeetcodeSolutionBatchCreateResponseDto;
export async function leetcodeSolutionSaveBatch(
    input: LeetcodeSolutionSaveBatchApiRequest,
): Promise<LeetcodeSolutionSaveBatchApiResponse | null> {
    return callApi<LeetcodeSolutionSaveBatchApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.saveBatch,
        body: input,
    });
}

export type LeetcodeSolutionImportUpdateXlsxApiRequest = FormData;
export type LeetcodeSolutionImportUpdateXlsxApiResponse = LeetcodeSolutionImportUpdateResponseDto;
export async function leetcodeSolutionImportUpdateXlsx(
    input: LeetcodeSolutionImportUpdateXlsxApiRequest,
): Promise<LeetcodeSolutionImportUpdateXlsxApiResponse | null> {
    return callApi<LeetcodeSolutionImportUpdateXlsxApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type LeetcodeSolutionImportXlsxApiRequest = FormData;
export type LeetcodeSolutionImportXlsxApiResponse = LeetcodeSolutionImportResponseDto;
export async function leetcodeSolutionImportXlsx(
    input: LeetcodeSolutionImportXlsxApiRequest,
): Promise<LeetcodeSolutionImportXlsxApiResponse | null> {
    return callApi<LeetcodeSolutionImportXlsxApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type LeetcodeSolutionUpdateBatchApiRequest = LeetcodeSolutionBatchUpdateRequestDto;
export type LeetcodeSolutionUpdateBatchApiResponse = LeetcodeSolutionWriteResponseDto;
export async function leetcodeSolutionUpdateBatch(
    input: LeetcodeSolutionUpdateBatchApiRequest,
): Promise<LeetcodeSolutionUpdateBatchApiResponse | null> {
    return callApi<LeetcodeSolutionUpdateBatchApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.updateBatch,
        body: input,
    });
}

export type LeetcodeSolutionUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: LeetcodeSolutionUpdateRequestDto;
};
export type LeetcodeSolutionUpdateApiResponse = LeetcodeSolutionWriteResponseDto;
export async function leetcodeSolutionUpdate(
    input: LeetcodeSolutionUpdateApiRequest,
): Promise<LeetcodeSolutionUpdateApiResponse | null> {
    return callApi<LeetcodeSolutionUpdateApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type LeetcodeSolutionDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type LeetcodeSolutionDeleteBatchApiResponse = LeetcodeSolutionWriteResponseDto;
export async function leetcodeSolutionDeleteBatch(
    input: LeetcodeSolutionDeleteBatchApiRequest,
): Promise<LeetcodeSolutionDeleteBatchApiResponse | null> {
    return callApi<LeetcodeSolutionDeleteBatchApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.deleteBatch,
        body: input,
    });
}

export type LeetcodeSolutionDeleteApiRequest = DatabaseIdParamsRequestDto;
export type LeetcodeSolutionDeleteApiResponse = LeetcodeSolutionWriteResponseDto;
export async function leetcodeSolutionDelete(
    input: LeetcodeSolutionDeleteApiRequest,
): Promise<LeetcodeSolutionDeleteApiResponse | null> {
    return callApi<LeetcodeSolutionDeleteApiResponse>({
        endpoint: leetcodeSolutionControllerApiMap.delete,
        params: input as any,
    });
}

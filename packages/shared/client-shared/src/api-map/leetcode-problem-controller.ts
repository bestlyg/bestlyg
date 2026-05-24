import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    LeetcodeNameParamsRequestDto,
    LeetcodeProblemBatchCreateRequestDto,
    LeetcodeProblemBatchCreateResponseDto,
    LeetcodeProblemBatchUpdateRequestDto,
    LeetcodeProblemBySlugResponseDto,
    LeetcodeProblemCreateRequestDto,
    LeetcodeProblemImportResponseDto,
    LeetcodeProblemImportUpdateResponseDto,
    LeetcodeProblemListResponseDto,
    LeetcodeProblemPageRequestDto,
    LeetcodeProblemPageResponseDto,
    LeetcodeProblemResponseDto,
    LeetcodeProblemUpdateRequestDto,
    LeetcodeProblemWriteResponseDto,
    LeetcodeSlugParamsRequestDto,
} from '@bestlyg/core-shared';

const leetcodeProblemControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/leetcode-problem',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/leetcode-problem/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/leetcode-problem/export',
    },
    findByName: {
        method: 'get',
        path: '/api/database/leetcode-problem/by-name/{name}',
    },
    findBySlug: {
        method: 'get',
        path: '/api/database/leetcode-problem/by-slug/{slug}',
    },
    findOne: {
        method: 'get',
        path: '/api/database/leetcode-problem/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/leetcode-problem',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/leetcode-problem/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/leetcode-problem/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/leetcode-problem/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/leetcode-problem/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/leetcode-problem/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/leetcode-problem/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/leetcode-problem/{id}',
    },
} as const;

export type LeetcodeProblemFindListApiRequest = void;
export type LeetcodeProblemFindListApiResponse = LeetcodeProblemListResponseDto;
export async function leetcodeProblemFindList(): Promise<LeetcodeProblemFindListApiResponse | null> {
    return callApi<LeetcodeProblemFindListApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.findList,
    });
}

export type LeetcodeProblemFindPageAndCountApiRequest = LeetcodeProblemPageRequestDto;
export type LeetcodeProblemFindPageAndCountApiResponse = LeetcodeProblemPageResponseDto;
export async function leetcodeProblemFindPageAndCount(
    input: LeetcodeProblemFindPageAndCountApiRequest,
): Promise<LeetcodeProblemFindPageAndCountApiResponse | null> {
    return callApi<LeetcodeProblemFindPageAndCountApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type LeetcodeProblemExportXlsxApiRequest = void;
export type LeetcodeProblemExportXlsxApiResponse = Blob;
export async function leetcodeProblemExportXlsx(): Promise<LeetcodeProblemExportXlsxApiResponse | null> {
    return callApi<LeetcodeProblemExportXlsxApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type LeetcodeProblemFindByNameApiRequest = LeetcodeNameParamsRequestDto;
export type LeetcodeProblemFindByNameApiResponse = LeetcodeProblemResponseDto;
export async function leetcodeProblemFindByName(
    input: LeetcodeProblemFindByNameApiRequest,
): Promise<LeetcodeProblemFindByNameApiResponse | null> {
    return callApi<LeetcodeProblemFindByNameApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.findByName,
        params: input as any,
    });
}

export type LeetcodeProblemFindBySlugApiRequest = LeetcodeSlugParamsRequestDto;
export type LeetcodeProblemFindBySlugApiResponse = LeetcodeProblemBySlugResponseDto;
export async function leetcodeProblemFindBySlug(
    input: LeetcodeProblemFindBySlugApiRequest,
): Promise<LeetcodeProblemFindBySlugApiResponse | null> {
    return callApi<LeetcodeProblemFindBySlugApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.findBySlug,
        params: input as any,
    });
}

export type LeetcodeProblemFindOneApiRequest = DatabaseIdParamsRequestDto;
export type LeetcodeProblemFindOneApiResponse = LeetcodeProblemResponseDto;
export async function leetcodeProblemFindOne(
    input: LeetcodeProblemFindOneApiRequest,
): Promise<LeetcodeProblemFindOneApiResponse | null> {
    return callApi<LeetcodeProblemFindOneApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.findOne,
        params: input as any,
    });
}

export type LeetcodeProblemSaveApiRequest = LeetcodeProblemCreateRequestDto;
export type LeetcodeProblemSaveApiResponse = LeetcodeProblemResponseDto;
export async function leetcodeProblemSave(
    input: LeetcodeProblemSaveApiRequest,
): Promise<LeetcodeProblemSaveApiResponse | null> {
    return callApi<LeetcodeProblemSaveApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.save,
        body: input,
    });
}

export type LeetcodeProblemSaveBatchApiRequest = LeetcodeProblemBatchCreateRequestDto;
export type LeetcodeProblemSaveBatchApiResponse = LeetcodeProblemBatchCreateResponseDto;
export async function leetcodeProblemSaveBatch(
    input: LeetcodeProblemSaveBatchApiRequest,
): Promise<LeetcodeProblemSaveBatchApiResponse | null> {
    return callApi<LeetcodeProblemSaveBatchApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.saveBatch,
        body: input,
    });
}

export type LeetcodeProblemImportUpdateXlsxApiRequest = FormData;
export type LeetcodeProblemImportUpdateXlsxApiResponse = LeetcodeProblemImportUpdateResponseDto;
export async function leetcodeProblemImportUpdateXlsx(
    input: LeetcodeProblemImportUpdateXlsxApiRequest,
): Promise<LeetcodeProblemImportUpdateXlsxApiResponse | null> {
    return callApi<LeetcodeProblemImportUpdateXlsxApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type LeetcodeProblemImportXlsxApiRequest = FormData;
export type LeetcodeProblemImportXlsxApiResponse = LeetcodeProblemImportResponseDto;
export async function leetcodeProblemImportXlsx(
    input: LeetcodeProblemImportXlsxApiRequest,
): Promise<LeetcodeProblemImportXlsxApiResponse | null> {
    return callApi<LeetcodeProblemImportXlsxApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type LeetcodeProblemUpdateBatchApiRequest = LeetcodeProblemBatchUpdateRequestDto;
export type LeetcodeProblemUpdateBatchApiResponse = LeetcodeProblemWriteResponseDto;
export async function leetcodeProblemUpdateBatch(
    input: LeetcodeProblemUpdateBatchApiRequest,
): Promise<LeetcodeProblemUpdateBatchApiResponse | null> {
    return callApi<LeetcodeProblemUpdateBatchApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.updateBatch,
        body: input,
    });
}

export type LeetcodeProblemUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: LeetcodeProblemUpdateRequestDto;
};
export type LeetcodeProblemUpdateApiResponse = LeetcodeProblemWriteResponseDto;
export async function leetcodeProblemUpdate(
    input: LeetcodeProblemUpdateApiRequest,
): Promise<LeetcodeProblemUpdateApiResponse | null> {
    return callApi<LeetcodeProblemUpdateApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type LeetcodeProblemDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type LeetcodeProblemDeleteBatchApiResponse = LeetcodeProblemWriteResponseDto;
export async function leetcodeProblemDeleteBatch(
    input: LeetcodeProblemDeleteBatchApiRequest,
): Promise<LeetcodeProblemDeleteBatchApiResponse | null> {
    return callApi<LeetcodeProblemDeleteBatchApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.deleteBatch,
        body: input,
    });
}

export type LeetcodeProblemDeleteApiRequest = DatabaseIdParamsRequestDto;
export type LeetcodeProblemDeleteApiResponse = LeetcodeProblemWriteResponseDto;
export async function leetcodeProblemDelete(
    input: LeetcodeProblemDeleteApiRequest,
): Promise<LeetcodeProblemDeleteApiResponse | null> {
    return callApi<LeetcodeProblemDeleteApiResponse>({
        endpoint: leetcodeProblemControllerApiMap.delete,
        params: input as any,
    });
}

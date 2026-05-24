import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    ServerlessBatchCreateRequestDto,
    ServerlessBatchCreateResponseDto,
    ServerlessBatchUpdateRequestDto,
    ServerlessCreateRequestDto,
    ServerlessImportResponseDto,
    ServerlessImportUpdateResponseDto,
    ServerlessListResponseDto,
    ServerlessPageRequestDto,
    ServerlessPageResponseDto,
    ServerlessResponseDto,
    ServerlessUpdateRequestDto,
    ServerlessWriteResponseDto,
} from '@bestlyg/core-shared';

const serverlessControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/serverless',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/serverless/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/serverless/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/serverless/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/serverless',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/serverless/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/serverless/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/serverless/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/serverless/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/serverless/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/serverless/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/serverless/{id}',
    },
    callGet: {
        method: 'get',
        path: '/api/serverless/call',
    },
    callPost: {
        method: 'post',
        path: '/api/serverless/call',
    },
    callPut: {
        method: 'put',
        path: '/api/serverless/call',
    },
    callDelete: {
        method: 'delete',
        path: '/api/serverless/call',
    },
    callPatch: {
        method: 'patch',
        path: '/api/serverless/call',
    },
    callOptions: {
        method: 'options',
        path: '/api/serverless/call',
    },
    callHead: {
        method: 'head',
        path: '/api/serverless/call',
    },
    callSearch: {
        method: 'search',
        path: '/api/serverless/call',
    },
} as const;

export type ServerlessFindListApiRequest = void;
export type ServerlessFindListApiResponse = ServerlessListResponseDto;
export async function serverlessFindList(): Promise<ServerlessFindListApiResponse | null> {
    return callApi<ServerlessFindListApiResponse>({
        endpoint: serverlessControllerApiMap.findList,
    });
}

export type ServerlessFindPageAndCountApiRequest = ServerlessPageRequestDto;
export type ServerlessFindPageAndCountApiResponse = ServerlessPageResponseDto;
export async function serverlessFindPageAndCount(
    input: ServerlessFindPageAndCountApiRequest,
): Promise<ServerlessFindPageAndCountApiResponse | null> {
    return callApi<ServerlessFindPageAndCountApiResponse>({
        endpoint: serverlessControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type ServerlessExportXlsxApiRequest = void;
export type ServerlessExportXlsxApiResponse = Blob;
export async function serverlessExportXlsx(): Promise<ServerlessExportXlsxApiResponse | null> {
    return callApi<ServerlessExportXlsxApiResponse>({
        endpoint: serverlessControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type ServerlessFindOneApiRequest = DatabaseIdParamsRequestDto;
export type ServerlessFindOneApiResponse = ServerlessResponseDto;
export async function serverlessFindOne(
    input: ServerlessFindOneApiRequest,
): Promise<ServerlessFindOneApiResponse | null> {
    return callApi<ServerlessFindOneApiResponse>({
        endpoint: serverlessControllerApiMap.findOne,
        params: input as any,
    });
}

export type ServerlessSaveApiRequest = ServerlessCreateRequestDto;
export type ServerlessSaveApiResponse = ServerlessResponseDto;
export async function serverlessSave(
    input: ServerlessSaveApiRequest,
): Promise<ServerlessSaveApiResponse | null> {
    return callApi<ServerlessSaveApiResponse>({
        endpoint: serverlessControllerApiMap.save,
        body: input,
    });
}

export type ServerlessSaveBatchApiRequest = ServerlessBatchCreateRequestDto;
export type ServerlessSaveBatchApiResponse = ServerlessBatchCreateResponseDto;
export async function serverlessSaveBatch(
    input: ServerlessSaveBatchApiRequest,
): Promise<ServerlessSaveBatchApiResponse | null> {
    return callApi<ServerlessSaveBatchApiResponse>({
        endpoint: serverlessControllerApiMap.saveBatch,
        body: input,
    });
}

export type ServerlessImportUpdateXlsxApiRequest = FormData;
export type ServerlessImportUpdateXlsxApiResponse = ServerlessImportUpdateResponseDto;
export async function serverlessImportUpdateXlsx(
    input: ServerlessImportUpdateXlsxApiRequest,
): Promise<ServerlessImportUpdateXlsxApiResponse | null> {
    return callApi<ServerlessImportUpdateXlsxApiResponse>({
        endpoint: serverlessControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type ServerlessImportXlsxApiRequest = FormData;
export type ServerlessImportXlsxApiResponse = ServerlessImportResponseDto;
export async function serverlessImportXlsx(
    input: ServerlessImportXlsxApiRequest,
): Promise<ServerlessImportXlsxApiResponse | null> {
    return callApi<ServerlessImportXlsxApiResponse>({
        endpoint: serverlessControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type ServerlessUpdateBatchApiRequest = ServerlessBatchUpdateRequestDto;
export type ServerlessUpdateBatchApiResponse = ServerlessWriteResponseDto;
export async function serverlessUpdateBatch(
    input: ServerlessUpdateBatchApiRequest,
): Promise<ServerlessUpdateBatchApiResponse | null> {
    return callApi<ServerlessUpdateBatchApiResponse>({
        endpoint: serverlessControllerApiMap.updateBatch,
        body: input,
    });
}

export type ServerlessUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: ServerlessUpdateRequestDto;
};
export type ServerlessUpdateApiResponse = ServerlessWriteResponseDto;
export async function serverlessUpdate(
    input: ServerlessUpdateApiRequest,
): Promise<ServerlessUpdateApiResponse | null> {
    return callApi<ServerlessUpdateApiResponse>({
        endpoint: serverlessControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type ServerlessDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type ServerlessDeleteBatchApiResponse = ServerlessWriteResponseDto;
export async function serverlessDeleteBatch(
    input: ServerlessDeleteBatchApiRequest,
): Promise<ServerlessDeleteBatchApiResponse | null> {
    return callApi<ServerlessDeleteBatchApiResponse>({
        endpoint: serverlessControllerApiMap.deleteBatch,
        body: input,
    });
}

export type ServerlessDeleteApiRequest = DatabaseIdParamsRequestDto;
export type ServerlessDeleteApiResponse = ServerlessWriteResponseDto;
export async function serverlessDelete(
    input: ServerlessDeleteApiRequest,
): Promise<ServerlessDeleteApiResponse | null> {
    return callApi<ServerlessDeleteApiResponse>({
        endpoint: serverlessControllerApiMap.delete,
        params: input as any,
    });
}

export type ServerlessCallGetApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallGetApiResponse = unknown;
export async function serverlessCallGet(
    input?: ServerlessCallGetApiRequest,
): Promise<ServerlessCallGetApiResponse | null> {
    return callApi<ServerlessCallGetApiResponse>({
        endpoint: serverlessControllerApiMap.callGet,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallPostApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallPostApiResponse = unknown;
export async function serverlessCallPost(
    input?: ServerlessCallPostApiRequest,
): Promise<ServerlessCallPostApiResponse | null> {
    return callApi<ServerlessCallPostApiResponse>({
        endpoint: serverlessControllerApiMap.callPost,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallPutApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallPutApiResponse = unknown;
export async function serverlessCallPut(
    input?: ServerlessCallPutApiRequest,
): Promise<ServerlessCallPutApiResponse | null> {
    return callApi<ServerlessCallPutApiResponse>({
        endpoint: serverlessControllerApiMap.callPut,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallDeleteApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallDeleteApiResponse = unknown;
export async function serverlessCallDelete(
    input?: ServerlessCallDeleteApiRequest,
): Promise<ServerlessCallDeleteApiResponse | null> {
    return callApi<ServerlessCallDeleteApiResponse>({
        endpoint: serverlessControllerApiMap.callDelete,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallPatchApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallPatchApiResponse = unknown;
export async function serverlessCallPatch(
    input?: ServerlessCallPatchApiRequest,
): Promise<ServerlessCallPatchApiResponse | null> {
    return callApi<ServerlessCallPatchApiResponse>({
        endpoint: serverlessControllerApiMap.callPatch,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallOptionsApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallOptionsApiResponse = unknown;
export async function serverlessCallOptions(
    input?: ServerlessCallOptionsApiRequest,
): Promise<ServerlessCallOptionsApiResponse | null> {
    return callApi<ServerlessCallOptionsApiResponse>({
        endpoint: serverlessControllerApiMap.callOptions,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallHeadApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallHeadApiResponse = unknown;
export async function serverlessCallHead(
    input?: ServerlessCallHeadApiRequest,
): Promise<ServerlessCallHeadApiResponse | null> {
    return callApi<ServerlessCallHeadApiResponse>({
        endpoint: serverlessControllerApiMap.callHead,
        query: input?.query,
        body: input?.body,
    });
}

export type ServerlessCallSearchApiRequest = {
    query?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};
export type ServerlessCallSearchApiResponse = unknown;
export async function serverlessCallSearch(
    input?: ServerlessCallSearchApiRequest,
): Promise<ServerlessCallSearchApiResponse | null> {
    return callApi<ServerlessCallSearchApiResponse>({
        endpoint: serverlessControllerApiMap.callSearch,
        query: input?.query,
        body: input?.body,
    });
}

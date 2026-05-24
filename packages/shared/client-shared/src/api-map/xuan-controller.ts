import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    XuanBatchCreateRequestDto,
    XuanBatchCreateResponseDto,
    XuanBatchUpdateRequestDto,
    XuanCreateRequestDto,
    XuanImportResponseDto,
    XuanImportUpdateResponseDto,
    XuanListResponseDto,
    XuanPageRequestDto,
    XuanPageResponseDto,
    XuanResponseDto,
    XuanUpdateRequestDto,
    XuanWriteResponseDto,
} from '@bestlyg/core-shared';

const xuanControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/xuan',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/xuan/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/xuan/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/xuan/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/xuan',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/xuan/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/xuan/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/xuan/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/xuan/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/xuan/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/xuan/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/xuan/{id}',
    },
} as const;

export type XuanFindListApiRequest = void;
export type XuanFindListApiResponse = XuanListResponseDto;
export async function xuanFindList(): Promise<XuanFindListApiResponse | null> {
    return callApi<XuanFindListApiResponse>({
        endpoint: xuanControllerApiMap.findList,
    });
}

export type XuanFindPageAndCountApiRequest = XuanPageRequestDto;
export type XuanFindPageAndCountApiResponse = XuanPageResponseDto;
export async function xuanFindPageAndCount(
    input: XuanFindPageAndCountApiRequest,
): Promise<XuanFindPageAndCountApiResponse | null> {
    return callApi<XuanFindPageAndCountApiResponse>({
        endpoint: xuanControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type XuanExportXlsxApiRequest = void;
export type XuanExportXlsxApiResponse = Blob;
export async function xuanExportXlsx(): Promise<XuanExportXlsxApiResponse | null> {
    return callApi<XuanExportXlsxApiResponse>({
        endpoint: xuanControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type XuanFindOneApiRequest = DatabaseIdParamsRequestDto;
export type XuanFindOneApiResponse = XuanResponseDto;
export async function xuanFindOne(
    input: XuanFindOneApiRequest,
): Promise<XuanFindOneApiResponse | null> {
    return callApi<XuanFindOneApiResponse>({
        endpoint: xuanControllerApiMap.findOne,
        params: input as any,
    });
}

export type XuanSaveApiRequest = XuanCreateRequestDto;
export type XuanSaveApiResponse = XuanResponseDto;
export async function xuanSave(input: XuanSaveApiRequest): Promise<XuanSaveApiResponse | null> {
    return callApi<XuanSaveApiResponse>({
        endpoint: xuanControllerApiMap.save,
        body: input,
    });
}

export type XuanSaveBatchApiRequest = XuanBatchCreateRequestDto;
export type XuanSaveBatchApiResponse = XuanBatchCreateResponseDto;
export async function xuanSaveBatch(
    input: XuanSaveBatchApiRequest,
): Promise<XuanSaveBatchApiResponse | null> {
    return callApi<XuanSaveBatchApiResponse>({
        endpoint: xuanControllerApiMap.saveBatch,
        body: input,
    });
}

export type XuanImportUpdateXlsxApiRequest = FormData;
export type XuanImportUpdateXlsxApiResponse = XuanImportUpdateResponseDto;
export async function xuanImportUpdateXlsx(
    input: XuanImportUpdateXlsxApiRequest,
): Promise<XuanImportUpdateXlsxApiResponse | null> {
    return callApi<XuanImportUpdateXlsxApiResponse>({
        endpoint: xuanControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type XuanImportXlsxApiRequest = FormData;
export type XuanImportXlsxApiResponse = XuanImportResponseDto;
export async function xuanImportXlsx(
    input: XuanImportXlsxApiRequest,
): Promise<XuanImportXlsxApiResponse | null> {
    return callApi<XuanImportXlsxApiResponse>({
        endpoint: xuanControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type XuanUpdateBatchApiRequest = XuanBatchUpdateRequestDto;
export type XuanUpdateBatchApiResponse = XuanWriteResponseDto;
export async function xuanUpdateBatch(
    input: XuanUpdateBatchApiRequest,
): Promise<XuanUpdateBatchApiResponse | null> {
    return callApi<XuanUpdateBatchApiResponse>({
        endpoint: xuanControllerApiMap.updateBatch,
        body: input,
    });
}

export type XuanUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: XuanUpdateRequestDto;
};
export type XuanUpdateApiResponse = XuanWriteResponseDto;
export async function xuanUpdate(
    input: XuanUpdateApiRequest,
): Promise<XuanUpdateApiResponse | null> {
    return callApi<XuanUpdateApiResponse>({
        endpoint: xuanControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type XuanDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type XuanDeleteBatchApiResponse = XuanWriteResponseDto;
export async function xuanDeleteBatch(
    input: XuanDeleteBatchApiRequest,
): Promise<XuanDeleteBatchApiResponse | null> {
    return callApi<XuanDeleteBatchApiResponse>({
        endpoint: xuanControllerApiMap.deleteBatch,
        body: input,
    });
}

export type XuanDeleteApiRequest = DatabaseIdParamsRequestDto;
export type XuanDeleteApiResponse = XuanWriteResponseDto;
export async function xuanDelete(
    input: XuanDeleteApiRequest,
): Promise<XuanDeleteApiResponse | null> {
    return callApi<XuanDeleteApiResponse>({
        endpoint: xuanControllerApiMap.delete,
        params: input as any,
    });
}

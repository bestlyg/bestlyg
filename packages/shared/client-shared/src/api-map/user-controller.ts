import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    UserBatchCreateRequestDto,
    UserBatchCreateResponseDto,
    UserBatchUpdateRequestDto,
    UserCreateRequestDto,
    UserImportResponseDto,
    UserImportUpdateResponseDto,
    UserListResponseDto,
    UserPageRequestDto,
    UserPageResponseDto,
    UserResponseDto,
    UserUpdateRequestDto,
    UserWriteResponseDto,
} from '@bestlyg/core-shared';

const userControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/user',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/user/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/user/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/user/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/user',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/user/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/user/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/user/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/user/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/user/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/user/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/user/{id}',
    },
} as const;

export type UserFindListApiRequest = void;
export type UserFindListApiResponse = UserListResponseDto;
export async function userFindList(): Promise<UserFindListApiResponse | null> {
    return callApi<UserFindListApiResponse>({
        endpoint: userControllerApiMap.findList,
    });
}

export type UserFindPageAndCountApiRequest = UserPageRequestDto;
export type UserFindPageAndCountApiResponse = UserPageResponseDto;
export async function userFindPageAndCount(
    input: UserFindPageAndCountApiRequest,
): Promise<UserFindPageAndCountApiResponse | null> {
    return callApi<UserFindPageAndCountApiResponse>({
        endpoint: userControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type UserExportXlsxApiRequest = void;
export type UserExportXlsxApiResponse = Blob;
export async function userExportXlsx(): Promise<UserExportXlsxApiResponse | null> {
    return callApi<UserExportXlsxApiResponse>({
        endpoint: userControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type UserFindOneApiRequest = DatabaseIdParamsRequestDto;
export type UserFindOneApiResponse = UserResponseDto;
export async function userFindOne(
    input: UserFindOneApiRequest,
): Promise<UserFindOneApiResponse | null> {
    return callApi<UserFindOneApiResponse>({
        endpoint: userControllerApiMap.findOne,
        params: input as any,
    });
}

export type UserSaveApiRequest = UserCreateRequestDto;
export type UserSaveApiResponse = UserResponseDto;
export async function userSave(input: UserSaveApiRequest): Promise<UserSaveApiResponse | null> {
    return callApi<UserSaveApiResponse>({
        endpoint: userControllerApiMap.save,
        body: input,
    });
}

export type UserSaveBatchApiRequest = UserBatchCreateRequestDto;
export type UserSaveBatchApiResponse = UserBatchCreateResponseDto;
export async function userSaveBatch(
    input: UserSaveBatchApiRequest,
): Promise<UserSaveBatchApiResponse | null> {
    return callApi<UserSaveBatchApiResponse>({
        endpoint: userControllerApiMap.saveBatch,
        body: input,
    });
}

export type UserImportUpdateXlsxApiRequest = FormData;
export type UserImportUpdateXlsxApiResponse = UserImportUpdateResponseDto;
export async function userImportUpdateXlsx(
    input: UserImportUpdateXlsxApiRequest,
): Promise<UserImportUpdateXlsxApiResponse | null> {
    return callApi<UserImportUpdateXlsxApiResponse>({
        endpoint: userControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type UserImportXlsxApiRequest = FormData;
export type UserImportXlsxApiResponse = UserImportResponseDto;
export async function userImportXlsx(
    input: UserImportXlsxApiRequest,
): Promise<UserImportXlsxApiResponse | null> {
    return callApi<UserImportXlsxApiResponse>({
        endpoint: userControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type UserUpdateBatchApiRequest = UserBatchUpdateRequestDto;
export type UserUpdateBatchApiResponse = UserWriteResponseDto;
export async function userUpdateBatch(
    input: UserUpdateBatchApiRequest,
): Promise<UserUpdateBatchApiResponse | null> {
    return callApi<UserUpdateBatchApiResponse>({
        endpoint: userControllerApiMap.updateBatch,
        body: input,
    });
}

export type UserUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: UserUpdateRequestDto;
};
export type UserUpdateApiResponse = UserWriteResponseDto;
export async function userUpdate(
    input: UserUpdateApiRequest,
): Promise<UserUpdateApiResponse | null> {
    return callApi<UserUpdateApiResponse>({
        endpoint: userControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type UserDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type UserDeleteBatchApiResponse = UserWriteResponseDto;
export async function userDeleteBatch(
    input: UserDeleteBatchApiRequest,
): Promise<UserDeleteBatchApiResponse | null> {
    return callApi<UserDeleteBatchApiResponse>({
        endpoint: userControllerApiMap.deleteBatch,
        body: input,
    });
}

export type UserDeleteApiRequest = DatabaseIdParamsRequestDto;
export type UserDeleteApiResponse = UserWriteResponseDto;
export async function userDelete(
    input: UserDeleteApiRequest,
): Promise<UserDeleteApiResponse | null> {
    return callApi<UserDeleteApiResponse>({
        endpoint: userControllerApiMap.delete,
        params: input as any,
    });
}

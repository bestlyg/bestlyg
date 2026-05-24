import { callApi } from './utils';
import type {
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
    SecretsBatchCreateRequestDto,
    SecretsBatchCreateResponseDto,
    SecretsBatchUpdateRequestDto,
    SecretsCreateRequestDto,
    SecretsImportResponseDto,
    SecretsImportUpdateResponseDto,
    SecretsListResponseDto,
    SecretsPageRequestDto,
    SecretsPageResponseDto,
    SecretsResponseDto,
    SecretsUpdateRequestDto,
    SecretsWriteResponseDto,
} from '@bestlyg/core-shared';

const secretsControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/secrets',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/secrets/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/secrets/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/secrets/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/secrets',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/secrets/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/secrets/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/secrets/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/secrets/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/secrets/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/secrets/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/secrets/{id}',
    },
} as const;

export type SecretsFindListApiRequest = void;
export type SecretsFindListApiResponse = SecretsListResponseDto;
export async function secretsFindList(): Promise<SecretsFindListApiResponse | null> {
    return callApi<SecretsFindListApiResponse>({
        endpoint: secretsControllerApiMap.findList,
    });
}

export type SecretsFindPageAndCountApiRequest = SecretsPageRequestDto;
export type SecretsFindPageAndCountApiResponse = SecretsPageResponseDto;
export async function secretsFindPageAndCount(
    input: SecretsFindPageAndCountApiRequest,
): Promise<SecretsFindPageAndCountApiResponse | null> {
    return callApi<SecretsFindPageAndCountApiResponse>({
        endpoint: secretsControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type SecretsExportXlsxApiRequest = void;
export type SecretsExportXlsxApiResponse = Blob;
export async function secretsExportXlsx(): Promise<SecretsExportXlsxApiResponse | null> {
    return callApi<SecretsExportXlsxApiResponse>({
        endpoint: secretsControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type SecretsFindOneApiRequest = DatabaseIdParamsRequestDto;
export type SecretsFindOneApiResponse = SecretsResponseDto;
export async function secretsFindOne(
    input: SecretsFindOneApiRequest,
): Promise<SecretsFindOneApiResponse | null> {
    return callApi<SecretsFindOneApiResponse>({
        endpoint: secretsControllerApiMap.findOne,
        params: input as any,
    });
}

export type SecretsSaveApiRequest = SecretsCreateRequestDto;
export type SecretsSaveApiResponse = SecretsResponseDto;
export async function secretsSave(
    input: SecretsSaveApiRequest,
): Promise<SecretsSaveApiResponse | null> {
    return callApi<SecretsSaveApiResponse>({
        endpoint: secretsControllerApiMap.save,
        body: input,
    });
}

export type SecretsSaveBatchApiRequest = SecretsBatchCreateRequestDto;
export type SecretsSaveBatchApiResponse = SecretsBatchCreateResponseDto;
export async function secretsSaveBatch(
    input: SecretsSaveBatchApiRequest,
): Promise<SecretsSaveBatchApiResponse | null> {
    return callApi<SecretsSaveBatchApiResponse>({
        endpoint: secretsControllerApiMap.saveBatch,
        body: input,
    });
}

export type SecretsImportUpdateXlsxApiRequest = FormData;
export type SecretsImportUpdateXlsxApiResponse = SecretsImportUpdateResponseDto;
export async function secretsImportUpdateXlsx(
    input: SecretsImportUpdateXlsxApiRequest,
): Promise<SecretsImportUpdateXlsxApiResponse | null> {
    return callApi<SecretsImportUpdateXlsxApiResponse>({
        endpoint: secretsControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type SecretsImportXlsxApiRequest = FormData;
export type SecretsImportXlsxApiResponse = SecretsImportResponseDto;
export async function secretsImportXlsx(
    input: SecretsImportXlsxApiRequest,
): Promise<SecretsImportXlsxApiResponse | null> {
    return callApi<SecretsImportXlsxApiResponse>({
        endpoint: secretsControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type SecretsUpdateBatchApiRequest = SecretsBatchUpdateRequestDto;
export type SecretsUpdateBatchApiResponse = SecretsWriteResponseDto;
export async function secretsUpdateBatch(
    input: SecretsUpdateBatchApiRequest,
): Promise<SecretsUpdateBatchApiResponse | null> {
    return callApi<SecretsUpdateBatchApiResponse>({
        endpoint: secretsControllerApiMap.updateBatch,
        body: input,
    });
}

export type SecretsUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: SecretsUpdateRequestDto;
};
export type SecretsUpdateApiResponse = SecretsWriteResponseDto;
export async function secretsUpdate(
    input: SecretsUpdateApiRequest,
): Promise<SecretsUpdateApiResponse | null> {
    return callApi<SecretsUpdateApiResponse>({
        endpoint: secretsControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type SecretsDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type SecretsDeleteBatchApiResponse = SecretsWriteResponseDto;
export async function secretsDeleteBatch(
    input: SecretsDeleteBatchApiRequest,
): Promise<SecretsDeleteBatchApiResponse | null> {
    return callApi<SecretsDeleteBatchApiResponse>({
        endpoint: secretsControllerApiMap.deleteBatch,
        body: input,
    });
}

export type SecretsDeleteApiRequest = DatabaseIdParamsRequestDto;
export type SecretsDeleteApiResponse = SecretsWriteResponseDto;
export async function secretsDelete(
    input: SecretsDeleteApiRequest,
): Promise<SecretsDeleteApiResponse | null> {
    return callApi<SecretsDeleteApiResponse>({
        endpoint: secretsControllerApiMap.delete,
        params: input as any,
    });
}

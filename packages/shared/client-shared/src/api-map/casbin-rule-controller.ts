import { callApi } from './utils';
import type {
    CasbinRuleBatchCreateRequestDto,
    CasbinRuleBatchCreateResponseDto,
    CasbinRuleBatchUpdateRequestDto,
    CasbinRuleCreateRequestDto,
    CasbinRuleImportResponseDto,
    CasbinRuleImportUpdateResponseDto,
    CasbinRuleListResponseDto,
    CasbinRulePageRequestDto,
    CasbinRulePageResponseDto,
    CasbinRuleResponseDto,
    CasbinRuleUpdateRequestDto,
    CasbinRuleWriteResponseDto,
    DatabaseBatchDeleteRequestDto,
    DatabaseIdParamsRequestDto,
} from '@bestlyg/core-shared';

const casbinRuleControllerApiMap = {
    findList: {
        method: 'get',
        path: '/api/database/casbin-rule',
    },
    findPageAndCount: {
        method: 'get',
        path: '/api/database/casbin-rule/page',
    },
    exportXlsx: {
        method: 'get',
        path: '/api/database/casbin-rule/export',
    },
    findOne: {
        method: 'get',
        path: '/api/database/casbin-rule/{id}',
    },
    save: {
        method: 'post',
        path: '/api/database/casbin-rule',
    },
    saveBatch: {
        method: 'post',
        path: '/api/database/casbin-rule/batch',
    },
    importUpdateXlsx: {
        method: 'post',
        path: '/api/database/casbin-rule/import/update',
    },
    importXlsx: {
        method: 'post',
        path: '/api/database/casbin-rule/import',
    },
    updateBatch: {
        method: 'patch',
        path: '/api/database/casbin-rule/batch',
    },
    update: {
        method: 'patch',
        path: '/api/database/casbin-rule/{id}',
    },
    deleteBatch: {
        method: 'delete',
        path: '/api/database/casbin-rule/batch',
    },
    delete: {
        method: 'delete',
        path: '/api/database/casbin-rule/{id}',
    },
} as const;

export type CasbinRuleFindListApiRequest = void;
export type CasbinRuleFindListApiResponse = CasbinRuleListResponseDto;
export async function casbinRuleFindList(): Promise<CasbinRuleFindListApiResponse | null> {
    return callApi<CasbinRuleFindListApiResponse>({
        endpoint: casbinRuleControllerApiMap.findList,
    });
}

export type CasbinRuleFindPageAndCountApiRequest = CasbinRulePageRequestDto;
export type CasbinRuleFindPageAndCountApiResponse = CasbinRulePageResponseDto;
export async function casbinRuleFindPageAndCount(
    input: CasbinRuleFindPageAndCountApiRequest,
): Promise<CasbinRuleFindPageAndCountApiResponse | null> {
    return callApi<CasbinRuleFindPageAndCountApiResponse>({
        endpoint: casbinRuleControllerApiMap.findPageAndCount,
        query: input as any,
    });
}

export type CasbinRuleExportXlsxApiRequest = void;
export type CasbinRuleExportXlsxApiResponse = Blob;
export async function casbinRuleExportXlsx(): Promise<CasbinRuleExportXlsxApiResponse | null> {
    return callApi<CasbinRuleExportXlsxApiResponse>({
        endpoint: casbinRuleControllerApiMap.exportXlsx,
        responseType: 'blob',
    });
}

export type CasbinRuleFindOneApiRequest = DatabaseIdParamsRequestDto;
export type CasbinRuleFindOneApiResponse = CasbinRuleResponseDto;
export async function casbinRuleFindOne(
    input: CasbinRuleFindOneApiRequest,
): Promise<CasbinRuleFindOneApiResponse | null> {
    return callApi<CasbinRuleFindOneApiResponse>({
        endpoint: casbinRuleControllerApiMap.findOne,
        params: input as any,
    });
}

export type CasbinRuleSaveApiRequest = CasbinRuleCreateRequestDto;
export type CasbinRuleSaveApiResponse = CasbinRuleResponseDto;
export async function casbinRuleSave(
    input: CasbinRuleSaveApiRequest,
): Promise<CasbinRuleSaveApiResponse | null> {
    return callApi<CasbinRuleSaveApiResponse>({
        endpoint: casbinRuleControllerApiMap.save,
        body: input,
    });
}

export type CasbinRuleSaveBatchApiRequest = CasbinRuleBatchCreateRequestDto;
export type CasbinRuleSaveBatchApiResponse = CasbinRuleBatchCreateResponseDto;
export async function casbinRuleSaveBatch(
    input: CasbinRuleSaveBatchApiRequest,
): Promise<CasbinRuleSaveBatchApiResponse | null> {
    return callApi<CasbinRuleSaveBatchApiResponse>({
        endpoint: casbinRuleControllerApiMap.saveBatch,
        body: input,
    });
}

export type CasbinRuleImportUpdateXlsxApiRequest = FormData;
export type CasbinRuleImportUpdateXlsxApiResponse = CasbinRuleImportUpdateResponseDto;
export async function casbinRuleImportUpdateXlsx(
    input: CasbinRuleImportUpdateXlsxApiRequest,
): Promise<CasbinRuleImportUpdateXlsxApiResponse | null> {
    return callApi<CasbinRuleImportUpdateXlsxApiResponse>({
        endpoint: casbinRuleControllerApiMap.importUpdateXlsx,
        body: input,
        serializer: 'form',
    });
}

export type CasbinRuleImportXlsxApiRequest = FormData;
export type CasbinRuleImportXlsxApiResponse = CasbinRuleImportResponseDto;
export async function casbinRuleImportXlsx(
    input: CasbinRuleImportXlsxApiRequest,
): Promise<CasbinRuleImportXlsxApiResponse | null> {
    return callApi<CasbinRuleImportXlsxApiResponse>({
        endpoint: casbinRuleControllerApiMap.importXlsx,
        body: input,
        serializer: 'form',
    });
}

export type CasbinRuleUpdateBatchApiRequest = CasbinRuleBatchUpdateRequestDto;
export type CasbinRuleUpdateBatchApiResponse = CasbinRuleWriteResponseDto;
export async function casbinRuleUpdateBatch(
    input: CasbinRuleUpdateBatchApiRequest,
): Promise<CasbinRuleUpdateBatchApiResponse | null> {
    return callApi<CasbinRuleUpdateBatchApiResponse>({
        endpoint: casbinRuleControllerApiMap.updateBatch,
        body: input,
    });
}

export type CasbinRuleUpdateApiRequest = {
    params: DatabaseIdParamsRequestDto;
    body: CasbinRuleUpdateRequestDto;
};
export type CasbinRuleUpdateApiResponse = CasbinRuleWriteResponseDto;
export async function casbinRuleUpdate(
    input: CasbinRuleUpdateApiRequest,
): Promise<CasbinRuleUpdateApiResponse | null> {
    return callApi<CasbinRuleUpdateApiResponse>({
        endpoint: casbinRuleControllerApiMap.update,
        params: input.params as any,
        body: input.body,
    });
}

export type CasbinRuleDeleteBatchApiRequest = DatabaseBatchDeleteRequestDto;
export type CasbinRuleDeleteBatchApiResponse = CasbinRuleWriteResponseDto;
export async function casbinRuleDeleteBatch(
    input: CasbinRuleDeleteBatchApiRequest,
): Promise<CasbinRuleDeleteBatchApiResponse | null> {
    return callApi<CasbinRuleDeleteBatchApiResponse>({
        endpoint: casbinRuleControllerApiMap.deleteBatch,
        body: input,
    });
}

export type CasbinRuleDeleteApiRequest = DatabaseIdParamsRequestDto;
export type CasbinRuleDeleteApiResponse = CasbinRuleWriteResponseDto;
export async function casbinRuleDelete(
    input: CasbinRuleDeleteApiRequest,
): Promise<CasbinRuleDeleteApiResponse | null> {
    return callApi<CasbinRuleDeleteApiResponse>({
        endpoint: casbinRuleControllerApiMap.delete,
        params: input as any,
    });
}

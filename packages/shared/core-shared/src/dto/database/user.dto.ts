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
    importCreateResponse,
    nonEmptyObject,
    pageResponse,
    requiredStringSchema,
    withBaseColumns,
} from './common.dto';

export const userCreateRequest = z
    .object({
        name: requiredStringSchema,
        pwd: requiredStringSchema,
        avatar: requiredStringSchema,
        description: requiredStringSchema,
        nickname: requiredStringSchema,
    })
    .strict();
export const userUpdateRequest = userCreateRequest.partial();
export const userUpdateBodyRequest = nonEmptyObject(userUpdateRequest, 'body');
export const userBatchCreateRequest = z.array(userCreateRequest).min(1);
export const userBatchUpdateRequest = batchUpdateBodySchema(userUpdateRequest);
export const userPageRequest = databasePageRequest;

export const userResponse = baseEntityResponse
    .extend({
        name: z.string(),
        pwd: z.string(),
        avatar: z.string(),
        description: z.string(),
        nickname: z.string(),
    })
    .passthrough();
export const userListResponse = z.array(userResponse);
export const userPageResponse = pageResponse(userResponse);
export const userBatchCreateResponse = z.array(userResponse);
export const userImportResponse = importCreateResponse(userResponse);
export const userImportUpdateResponse = databaseImportUpdateResponse;
export const userExportResponse = databaseXlsxExportResponse;
export const userWriteResponse = databaseWriteResponse;

export class UserPageRequestDto extends createZodModel(userPageRequest) {}
export class UserCreateRequestDto extends createZodModel(userCreateRequest) {}
export class UserUpdateRequestDto extends createZodModel(userUpdateBodyRequest) {}
export class UserBatchCreateRequestDto extends createZodModel(userBatchCreateRequest) {}
export class UserBatchUpdateRequestDto extends createZodModel(userBatchUpdateRequest) {}

export class UserResponseDto extends createZodModel(userResponse) {}
export class UserListResponseDto extends createZodModel(userListResponse) {}
export class UserPageResponseDto extends createZodModel(userPageResponse) {}
export class UserBatchCreateResponseDto extends createZodModel(userBatchCreateResponse) {}
export class UserImportResponseDto extends createZodModel(userImportResponse) {}
export class UserImportUpdateResponseDto extends createZodModel(userImportUpdateResponse) {}
export class UserExportResponseDto extends createZodModel(userExportResponse) {}
export class UserWriteResponseDto extends createZodModel(userWriteResponse) {}

export const userResourceSchema = {
    resourceName: 'user',
    createSchema: userCreateRequest,
    updateSchema: userUpdateRequest,
    xlsxColumns: withBaseColumns([
        { key: 'name' },
        { key: 'pwd' },
        { key: 'avatar', width: 40 },
        { key: 'description', width: 40 },
        { key: 'nickname' },
    ]),
} satisfies DatabaseResourceSchema<any, any, any>;

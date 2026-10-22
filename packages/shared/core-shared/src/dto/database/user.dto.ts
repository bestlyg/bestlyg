import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestSchema,
    DatabaseWriteResponseSchema,
    EntityBaseResponseSchema,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseSchema,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseSchema,
    DatabaseXlsxImportResponseSchema,
} from './xlsx.dto';

/** 用户分页查询请求 DTO。 */
export const UserPageRequestSchema = DatabasePageRequestSchema;
export type UserPageRequestDto = z.output<typeof UserPageRequestSchema>;

/** 创建用户请求 DTO。 */
export const UserCreateRequestSchema = z
    .object({
        name: z.coerce.string().trim().min(1),
        pwd: z.coerce.string().trim().min(1),
        avatar: z.coerce.string().trim().min(1),
        description: z.coerce.string().trim().min(1),
        nickname: z.coerce.string().trim().min(1),
    })
    .strict();
export type UserCreateRequestDto = z.output<typeof UserCreateRequestSchema>;

/** 更新用户请求 DTO，至少需要提交一个可更新字段。 */
export const UserUpdateRequestSchema = UserCreateRequestSchema.partial().refine(
    (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
    { message: '请求体至少需要包含一个字段' },
);
export type UserUpdateRequestDto = z.output<typeof UserUpdateRequestSchema>;

/** 批量创建用户请求 DTO。 */
export const UserBatchCreateRequestSchema = z.array(UserCreateRequestSchema).min(1);
export type UserBatchCreateRequestDto = z.output<typeof UserBatchCreateRequestSchema>;

/** 批量更新用户请求 DTO。 */
export const UserBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: UserCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '批量更新数据至少需要包含一个字段' },
    ),
});
export type UserBatchUpdateRequestDto = z.output<typeof UserBatchUpdateRequestSchema>;

/** 用户响应 DTO。 */
export const UserResponseSchema = EntityBaseResponseSchema.extend({
    name: z.string(),
    pwd: z.string(),
    avatar: z.string(),
    description: z.string(),
    nickname: z.string(),
});
export type UserResponseDto = z.output<typeof UserResponseSchema>;

/** 用户列表响应 DTO。 */
export const UserListResponseSchema = z.array(UserResponseSchema);
export type UserListResponseDto = z.output<typeof UserListResponseSchema>;

/** 用户分页响应 DTO。 */
export const UserPageResponseSchema = PageData.schema(UserResponseSchema);
export type UserPageResponseDto = z.output<typeof UserPageResponseSchema>;

/** 批量创建用户响应 DTO。 */
export const UserBatchCreateResponseSchema = z.array(UserResponseSchema);
export type UserBatchCreateResponseDto = z.output<typeof UserBatchCreateResponseSchema>;

/** 用户 XLSX 新增导入响应 DTO。 */
export const UserImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(UserResponseSchema),
});
export type UserImportResponseDto = z.output<typeof UserImportResponseSchema>;

/** 用户 XLSX 更新导入响应 DTO。 */
export const UserImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type UserImportUpdateResponseDto = z.output<typeof UserImportUpdateResponseSchema>;

/** 用户 XLSX 导出响应 DTO。 */
export const UserExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type UserExportResponseDto = z.output<typeof UserExportResponseSchema>;

/** 用户写操作响应 DTO。 */
export const UserWriteResponseSchema = DatabaseWriteResponseSchema;
export type UserWriteResponseDto = z.output<typeof UserWriteResponseSchema>;

/** 前端消费的用户 DTO。 */
export type User = UserResponseDto;

/** 用户资源的 XLSX 导入导出配置。 */
export const userResourceSchema = {
    resourceName: 'user',
    createSchema: UserCreateRequestSchema,
    updateSchema: UserCreateRequestSchema.partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'pwd' },
        { key: 'avatar', width: 40 },
        { key: 'description', width: 40 },
        { key: 'nickname' },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

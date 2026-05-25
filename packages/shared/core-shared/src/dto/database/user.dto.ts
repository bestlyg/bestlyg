import { createZodModel } from '../../zod';
import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestDto,
    DatabaseWriteResponseDto,
    EntityBaseResponseDto,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseDto,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseDto,
    DatabaseXlsxImportResponseDto,
} from './xlsx.dto';

/** 用户分页查询请求 DTO。 */
export class UserPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

/** 创建用户请求 DTO。 */
export class UserCreateRequestDto extends createZodModel(
    z
        .object({
            name: z.coerce.string().trim().min(1),
            pwd: z.coerce.string().trim().min(1),
            avatar: z.coerce.string().trim().min(1),
            description: z.coerce.string().trim().min(1),
            nickname: z.coerce.string().trim().min(1),
        })
        .strict(),
) {}

/** 更新用户请求 DTO，至少需要提交一个可更新字段。 */
export class UserUpdateRequestDto extends createZodModel(
    UserCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建用户请求 DTO。 */
export class UserBatchCreateRequestDto extends createZodModel(
    z.array(UserCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新用户请求 DTO。 */
export class UserBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: UserCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** 用户响应 DTO。 */
export class UserResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        pwd: z.string(),
        avatar: z.string(),
        description: z.string(),
        nickname: z.string(),
    }),
) {}

/** 用户列表响应 DTO。 */
export class UserListResponseDto extends createZodModel(z.array(UserResponseDto.getSchema())) {}

/** 用户分页响应 DTO。 */
export class UserPageResponseDto extends createZodModel(
    PageData.schema(UserResponseDto.getSchema()),
) {}

/** 批量创建用户响应 DTO。 */
export class UserBatchCreateResponseDto extends createZodModel(
    z.array(UserResponseDto.getSchema()),
) {}

/** 用户 XLSX 新增导入响应 DTO。 */
export class UserImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(UserResponseDto.getSchema()),
    }),
) {}

/** 用户 XLSX 更新导入响应 DTO。 */
export class UserImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** 用户 XLSX 导出响应 DTO。 */
export class UserExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** 用户写操作响应 DTO。 */
export class UserWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的用户 DTO。 */
export type User = z.output<ReturnType<typeof UserResponseDto.getSchema>>;

/** 用户资源的 XLSX 导入导出配置。 */
export const userResourceSchema = {
    resourceName: 'user',
    createSchema: UserCreateRequestDto.getSchema(),
    updateSchema: UserCreateRequestDto.getSchema().partial(),
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

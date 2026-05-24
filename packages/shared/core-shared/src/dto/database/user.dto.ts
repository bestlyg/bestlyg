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

export class UserPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

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

export class UserUpdateRequestDto extends createZodModel(
    UserCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class UserBatchCreateRequestDto extends createZodModel(
    z.array(UserCreateRequestDto.getSchema()).min(1),
) {}

export class UserBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: UserCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

export class UserResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        pwd: z.string(),
        avatar: z.string(),
        description: z.string(),
        nickname: z.string(),
    }),
) {}

export class UserListResponseDto extends createZodModel(z.array(UserResponseDto.getSchema())) {}

export class UserPageResponseDto extends createZodModel(
    PageData.schema(UserResponseDto.getSchema()),
) {}

export class UserBatchCreateResponseDto extends createZodModel(
    z.array(UserResponseDto.getSchema()),
) {}

export class UserImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(UserResponseDto.getSchema()),
    }),
) {}

export class UserImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class UserExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class UserWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的用户 DTO。 */
export type User = z.output<ReturnType<typeof UserResponseDto.getSchema>>;

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

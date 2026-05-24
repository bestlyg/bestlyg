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

export class SecretsPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

export class SecretsCreateRequestDto extends createZodModel(
    z
        .object({
            name: z.coerce.string().trim().min(1),
            data: z.coerce.string().trim().min(1),
        })
        .strict(),
) {}

export class SecretsUpdateRequestDto extends createZodModel(
    SecretsCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class SecretsBatchCreateRequestDto extends createZodModel(
    z.array(SecretsCreateRequestDto.getSchema()).min(1),
) {}

export class SecretsBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: SecretsCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

export class SecretsResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        data: z.string(),
    }),
) {}

export class SecretsListResponseDto extends createZodModel(
    z.array(SecretsResponseDto.getSchema()),
) {}

export class SecretsPageResponseDto extends createZodModel(
    PageData.schema(SecretsResponseDto.getSchema()),
) {}

export class SecretsBatchCreateResponseDto extends createZodModel(
    z.array(SecretsResponseDto.getSchema()),
) {}

export class SecretsImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(SecretsResponseDto.getSchema()),
    }),
) {}

export class SecretsImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class SecretsExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class SecretsWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的密钥 DTO。 */
export type Secrets = z.output<ReturnType<typeof SecretsResponseDto.getSchema>>;

export const secretsResourceSchema = {
    resourceName: 'secrets',
    createSchema: SecretsCreateRequestDto.getSchema(),
    updateSchema: SecretsCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'data', width: 48 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

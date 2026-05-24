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

export class ServerlessPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

export class ServerlessCreateRequestDto extends createZodModel(
    z
        .object({
            name: z.coerce.string().trim().min(1),
            code: z.coerce.string().trim().min(1),
        })
        .strict(),
) {}

export class ServerlessUpdateRequestDto extends createZodModel(
    ServerlessCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class ServerlessBatchCreateRequestDto extends createZodModel(
    z.array(ServerlessCreateRequestDto.getSchema()).min(1),
) {}

export class ServerlessBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: ServerlessCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

export class ServerlessResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        name: z.string(),
        code: z.string(),
    }),
) {}

export class ServerlessListResponseDto extends createZodModel(
    z.array(ServerlessResponseDto.getSchema()),
) {}

export class ServerlessPageResponseDto extends createZodModel(
    PageData.schema(ServerlessResponseDto.getSchema()),
) {}

export class ServerlessBatchCreateResponseDto extends createZodModel(
    z.array(ServerlessResponseDto.getSchema()),
) {}

export class ServerlessImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(ServerlessResponseDto.getSchema()),
    }),
) {}

export class ServerlessImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class ServerlessExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class ServerlessWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 前端消费的 serverless 函数 DTO。 */
export type Serverless = z.output<ReturnType<typeof ServerlessResponseDto.getSchema>>;

export const serverlessResourceSchema = {
    resourceName: 'serverless',
    createSchema: ServerlessCreateRequestDto.getSchema(),
    updateSchema: ServerlessCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'name' },
        { key: 'code', width: 60 },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

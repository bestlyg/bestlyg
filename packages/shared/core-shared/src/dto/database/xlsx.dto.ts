import { createZodModel } from '../../zod';
import { z } from 'zod';
import { idSchema } from './common.dto';

export const maxXlsxSize = 10 * 1024 * 1024;
export const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export class DatabaseXlsxFileMetaRequestDto extends createZodModel(
    z.object({
        originalname: z
            .string()
            .min(1)
            .refine((value) => value.toLowerCase().endsWith('.xlsx'), {
                message: 'Only .xlsx files are supported',
            }),
        mimetype: z
            .string()
            .min(1)
            .refine(
                (value) =>
                    value === xlsxMime ||
                    value === 'application/octet-stream' ||
                    value === 'application/zip',
                { message: 'Only XLSX mime types are supported' },
            ),
        size: z.number().int().positive().max(maxXlsxSize),
    }),
) {}

export class DatabaseXlsxFileRequestDto extends createZodModel(
    DatabaseXlsxFileMetaRequestDto.getSchema()
        .extend({
            buffer: z.custom<Uint8Array>(
                (value) => {
                    const bufferCtor = (
                        globalThis as typeof globalThis & {
                            Buffer?: { isBuffer(value: unknown): boolean };
                        }
                    ).Buffer;
                    return value instanceof Uint8Array || Boolean(bufferCtor?.isBuffer(value));
                },
                { message: 'file buffer is required' },
            ),
        })
        .loose(),
) {}

export class DatabaseXlsxImportResponseDto extends createZodModel(
    z.object({
        count: z.number().int().nonnegative(),
        data: z.array(z.unknown()),
    }),
) {}

export class DatabaseXlsxUpdateResponseDto extends createZodModel(
    z.object({
        count: z.number().int().nonnegative(),
        ids: z.array(idSchema),
    }),
) {}

export class DatabaseXlsxExportResponseDto extends createZodModel(
    z.object({
        filename: z
            .string()
            .min(1)
            .refine((value) => value.toLowerCase().endsWith('.xlsx'), {
                message: 'filename must end with .xlsx',
            }),
        contentType: z.literal(xlsxMime),
        size: z.number().int().positive(),
    }),
) {}

export class DatabaseImportUpdateResponseDto extends createZodModel(
    DatabaseXlsxUpdateResponseDto.getSchema(),
) {}

export interface DatabaseBaseEntity {
    id?: string;
    createdTime?: Date;
    updatedTime?: Date;
}

export interface XlsxColumn<Entity extends object = DatabaseBaseEntity> {
    key: string;
    header?: string;
    width?: number;
    readonly?: boolean;
    importable?: boolean;
    exportable?: boolean;
    parse?: (value: unknown) => unknown;
    format?: (value: unknown, entity: Entity) => unknown;
}

export interface DatabaseResourceSchema<
    Entity extends object = DatabaseBaseEntity,
    CreateInput extends object = Record<string, unknown>,
    UpdateInput extends object = Record<string, unknown>,
> {
    resourceName: string;
    createSchema: z.ZodType<CreateInput>;
    updateSchema: z.ZodType<UpdateInput>;
    xlsxColumns: XlsxColumn<Entity>[];
}

export type DatabaseXlsxFileRequest = z.input<
    ReturnType<typeof DatabaseXlsxFileRequestDto.getSchema>
>;
export type DatabaseXlsxImportResponse<Entity = unknown> = Omit<
    z.output<ReturnType<typeof DatabaseXlsxImportResponseDto.getSchema>>,
    'data'
> & {
    data: Entity[];
};
export type DatabaseXlsxUpdateResponse = z.output<
    ReturnType<typeof DatabaseXlsxUpdateResponseDto.getSchema>
>;
export type DatabaseXlsxExportResponse = z.output<
    ReturnType<typeof DatabaseXlsxExportResponseDto.getSchema>
>;

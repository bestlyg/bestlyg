import { createZodModel } from '../../zod';
import { z } from 'zod';

export const maxXlsxSize = 10 * 1024 * 1024;
export const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const idSchema = z.uuid();
export const requiredStringSchema = z.preprocess(
    (value) => {
        if (value == null) return '';
        if (typeof value === 'string') return value.trim();
        if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
            return String(value).trim();
        }
        return JSON.stringify(value)?.trim() ?? '';
    },
    z.string().min(1),
);
export const optionalStringSchema = z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().optional().nullable(),
);
export const dateSchema = z.coerce.date();
export const intSchema = z.coerce.number().int();
export const optionalNumberSchema = z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.number().optional().nullable(),
);
export const optionalIntSchema = z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.number().int().optional().nullable(),
);

export const pageQueryFields = {
    current: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().default(10),
};

export const databasePageRequest = z.object(pageQueryFields).strip();
export const databaseIdParamsRequest = z.object({ id: idSchema });
export const databaseBatchDeleteRequest = z.object({
    ids: z.array(idSchema).min(1),
});
export const databaseXlsxFileMetaRequest = z.object({
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
});
export const databaseXlsxFileRequest = databaseXlsxFileMetaRequest
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
    .loose();
export const databaseXlsxImportResponse = z.object({
    count: z.number().int().nonnegative(),
    data: z.array(z.unknown()),
});
export const databaseXlsxUpdateResponse = z.object({
    count: z.number().int().nonnegative(),
    ids: z.array(idSchema),
});
export const databaseXlsxExportResponse = z.object({
    filename: z
        .string()
        .min(1)
        .refine((value) => value.toLowerCase().endsWith('.xlsx'), {
            message: 'filename must end with .xlsx',
        }),
    contentType: z.literal(xlsxMime),
    size: z.number().int().positive(),
});
export const databaseWriteResponse = z
    .object({
        affected: z.number().int().nonnegative().optional().nullable(),
    })
    .loose();
export const databaseImportUpdateResponse = databaseXlsxUpdateResponse;
export const baseEntityResponse = z
    .object({
        id: idSchema.optional(),
        createdTime: dateSchema.optional(),
        updatedTime: dateSchema.optional(),
    })
    .loose();

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

export function booleanSchema() {
    return z.preprocess((value) => {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value !== 0;
        if (typeof value !== 'string') return value;

        const normalized = value.trim().toLowerCase();
        if (['true', '1', 'yes', 'y'].includes(normalized)) return true;
        if (['false', '0', 'no', 'n'].includes(normalized)) return false;
        return value;
    }, z.boolean());
}

type EnumSource = Record<string, string> | readonly [string, ...string[]];

export function enumSchema<T extends EnumSource>(value: T) {
    const values = Array.isArray(value) ? value : Object.values(value);
    return z.enum(values as [string, ...string[]]);
}

export function optionalEnumSchema<T extends EnumSource>(value: T) {
    return z.preprocess(
        (item) => (item === '' ? undefined : item),
        enumSchema(value).optional().nullable(),
    );
}

export function jsonSchema<T extends z.ZodType>(schema: T) {
    return z.preprocess((value) => {
        if (typeof value !== 'string') return value;
        const trimmed = value.trim();
        if (!trimmed) return undefined;
        return JSON.parse(trimmed);
    }, schema);
}

export function jsonCell(value: unknown) {
    if (value == null) return value;
    return JSON.stringify(value);
}

export function withBaseColumns<Entity extends object = DatabaseBaseEntity>(
    columns: XlsxColumn<Entity>[],
): XlsxColumn<Entity>[] {
    return [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        ...columns,
    ];
}

export function nonEmptyObject<T extends z.ZodType>(schema: T, label: string) {
    return schema.refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: `${label} must contain at least one field` },
    );
}

export function batchUpdateBodySchema<T extends z.ZodType>(updateSchema: T) {
    return z.object({
        ids: z.array(idSchema).min(1),
        data: nonEmptyObject(updateSchema, 'data'),
    });
}

export function pageResponse<T extends z.ZodType>(itemResponse: T) {
    return z.object({
        list: z.array(itemResponse),
        total: z.number().int().nonnegative(),
    });
}

export function importCreateResponse<T extends z.ZodType>(itemResponse: T) {
    return databaseXlsxImportResponse.extend({
        data: z.array(itemResponse),
    });
}

export type DatabaseXlsxFileRequest = z.input<typeof databaseXlsxFileRequest>;
export type DatabaseXlsxImportResponse<Entity = unknown> = Omit<
    z.output<typeof databaseXlsxImportResponse>,
    'data'
> & {
    data: Entity[];
};
export type DatabaseXlsxUpdateResponse = z.output<typeof databaseXlsxUpdateResponse>;
export type DatabaseXlsxExportResponse = z.output<typeof databaseXlsxExportResponse>;

export class DatabasePageRequestDto extends createZodModel(databasePageRequest) {}
export class DatabaseIdParamsRequestDto extends createZodModel(databaseIdParamsRequest) {}
export class DatabaseBatchDeleteRequestDto extends createZodModel(databaseBatchDeleteRequest) {}
export class DatabaseXlsxFileMetaRequestDto extends createZodModel(databaseXlsxFileMetaRequest) {}
export class DatabaseXlsxFileRequestDto extends createZodModel(databaseXlsxFileRequest) {}
export class DatabaseXlsxImportResponseDto extends createZodModel(databaseXlsxImportResponse) {}
export class DatabaseXlsxUpdateResponseDto extends createZodModel(databaseXlsxUpdateResponse) {}
export class DatabaseXlsxExportResponseDto extends createZodModel(databaseXlsxExportResponse) {}
export class DatabaseWriteResponseDto extends createZodModel(databaseWriteResponse) {}
export class DatabaseImportUpdateResponseDto extends createZodModel(databaseImportUpdateResponse) {}

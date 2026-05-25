import { createZodModel } from '../../zod';
import { z } from 'zod';
import { idSchema } from './common.dto';

export const maxXlsxSize = 10 * 1024 * 1024;
export const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/** XLSX 上传文件元信息请求 DTO。 */
export class DatabaseXlsxFileMetaRequestDto extends createZodModel(
    z.object({
        originalname: z
            .string()
            .min(1)
            .refine((value) => value.toLowerCase().endsWith('.xlsx'), {
                message: '仅支持 .xlsx 文件',
            }),
        mimetype: z
            .string()
            .min(1)
            .refine(
                (value) =>
                    value === xlsxMime ||
                    value === 'application/octet-stream' ||
                    value === 'application/zip',
                { message: '仅支持 XLSX 文件类型' },
            ),
        size: z.number().int().positive().max(maxXlsxSize),
    }),
) {}

/** XLSX 上传文件请求 DTO，包含服务端读取到的文件 buffer。 */
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
                { message: '文件内容不能为空' },
            ),
        })
        .loose(),
) {}

/** XLSX 新增导入响应 DTO。 */
export class DatabaseXlsxImportResponseDto extends createZodModel(
    z.object({
        count: z.number().int().nonnegative(),
        data: z.array(z.unknown()),
    }),
) {}

/** XLSX 更新导入响应 DTO。 */
export class DatabaseXlsxUpdateResponseDto extends createZodModel(
    z.object({
        count: z.number().int().nonnegative(),
        ids: z.array(idSchema),
    }),
) {}

/** XLSX 导出响应元信息 DTO。 */
export class DatabaseXlsxExportResponseDto extends createZodModel(
    z.object({
        filename: z
            .string()
            .min(1)
            .refine((value) => value.toLowerCase().endsWith('.xlsx'), {
                message: '文件名必须以 .xlsx 结尾',
            }),
        contentType: z.literal(xlsxMime),
        size: z.number().int().positive(),
    }),
) {}

/** 数据库 XLSX 更新导入响应 DTO。 */
export class DatabaseImportUpdateResponseDto extends createZodModel(
    DatabaseXlsxUpdateResponseDto.getSchema(),
) {}

/** 参与 XLSX 导入导出的数据库实体基础字段。 */
export interface DatabaseBaseEntity {
    id?: string;
    createdTime?: Date;
    updatedTime?: Date;
}

/** 单个 XLSX 列配置，描述导入导出字段、宽度和转换逻辑。 */
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

/** 数据库资源的 XLSX 导入导出配置。 */
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

/** 服务端接收的 XLSX 文件请求类型。 */
export type DatabaseXlsxFileRequest = z.input<
    ReturnType<typeof DatabaseXlsxFileRequestDto.getSchema>
>;

/** XLSX 新增导入响应类型。 */
export type DatabaseXlsxImportResponse<Entity = unknown> = Omit<
    z.output<ReturnType<typeof DatabaseXlsxImportResponseDto.getSchema>>,
    'data'
> & {
    data: Entity[];
};

/** XLSX 更新导入响应类型。 */
export type DatabaseXlsxUpdateResponse = z.output<
    ReturnType<typeof DatabaseXlsxUpdateResponseDto.getSchema>
>;

/** XLSX 导出响应元信息类型。 */
export type DatabaseXlsxExportResponse = z.output<
    ReturnType<typeof DatabaseXlsxExportResponseDto.getSchema>
>;

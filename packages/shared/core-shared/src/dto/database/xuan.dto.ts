import { createZodModel } from '../../zod';
import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestDto,
    DatabaseWriteResponseDto,
    dateValueSchema,
    EntityBaseResponseDto,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseDto,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseDto,
    DatabaseXlsxImportResponseDto,
} from './xlsx.dto';

export class XuanPageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

export class XuanCreateRequestDto extends createZodModel(
    z
        .object({
            date: z.coerce.date(),
            weight: z.preprocess(
                (value) => (value === '' ? undefined : value),
                z.coerce.number().int().optional().nullable(),
            ),
            dance_times: z.preprocess(
                (value) => (value === '' ? undefined : value),
                z.coerce.number().int().optional().nullable(),
            ),
        })
        .strict(),
) {}

export class XuanUpdateRequestDto extends createZodModel(
    XuanCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class XuanBatchCreateRequestDto extends createZodModel(
    z.array(XuanCreateRequestDto.getSchema()).min(1),
) {}

export class XuanBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: XuanCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

export class XuanResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        date: dateValueSchema,
        weight: z.number().int().optional().nullable(),
        dance_times: z.number().int().optional().nullable(),
    }),
) {}

export class XuanListResponseDto extends createZodModel(z.array(XuanResponseDto.getSchema())) {}

export class XuanPageResponseDto extends createZodModel(
    PageData.schema(XuanResponseDto.getSchema()),
) {}

export class XuanBatchCreateResponseDto extends createZodModel(
    z.array(XuanResponseDto.getSchema()),
) {}

export class XuanImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(XuanResponseDto.getSchema()),
    }),
) {}

export class XuanImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class XuanExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class XuanWriteResponseDto extends createZodModel(DatabaseWriteResponseDto.getSchema()) {}

/** 前端消费的体重/运动记录 DTO。 */
export type Xuan = z.output<ReturnType<typeof XuanResponseDto.getSchema>>;

export const xuanResourceSchema = {
    resourceName: 'xuan',
    createSchema: XuanCreateRequestDto.getSchema(),
    updateSchema: XuanCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'date', width: 20 },
        { key: 'weight' },
        { key: 'dance_times' },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

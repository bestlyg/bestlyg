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

export class CasbinRulePageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

export class CasbinRuleCreateRequestDto extends createZodModel(
    z
        .object({
            ptype: z.coerce.string().trim().min(1),
            p0: z.coerce.string().trim().min(1),
            p1: z.coerce.string().trim().min(1),
            p2: z.coerce.string().trim().min(1),
            p3: z.coerce.string().trim().min(1),
            p4: z.coerce.string().trim().min(1),
            p5: z.coerce.string().trim().min(1),
        })
        .strict(),
) {}

export class CasbinRuleUpdateRequestDto extends createZodModel(
    CasbinRuleCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: 'body must contain at least one field' },
        ),
) {}

export class CasbinRuleBatchCreateRequestDto extends createZodModel(
    z.array(CasbinRuleCreateRequestDto.getSchema()).min(1),
) {}

export class CasbinRuleBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: CasbinRuleCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: 'data must contain at least one field' },
            ),
    }),
) {}

export class CasbinRuleResponseDto extends createZodModel(
    EntityBaseResponseDto.getSchema().extend({
        ptype: z.string(),
        p0: z.string(),
        p1: z.string(),
        p2: z.string(),
        p3: z.string(),
        p4: z.string(),
        p5: z.string(),
    }),
) {}

export class CasbinRuleListResponseDto extends createZodModel(
    z.array(CasbinRuleResponseDto.getSchema()),
) {}

export class CasbinRulePageResponseDto extends createZodModel(
    PageData.schema(CasbinRuleResponseDto.getSchema()),
) {}

export class CasbinRuleBatchCreateResponseDto extends createZodModel(
    z.array(CasbinRuleResponseDto.getSchema()),
) {}

export class CasbinRuleImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(CasbinRuleResponseDto.getSchema()),
    }),
) {}

export class CasbinRuleImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

export class CasbinRuleExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

export class CasbinRuleWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 前端消费的 Casbin 规则 DTO。 */
export type CasbinRule = z.output<ReturnType<typeof CasbinRuleResponseDto.getSchema>>;

export const casbinRuleResourceSchema = {
    resourceName: 'casbin-rule',
    createSchema: CasbinRuleCreateRequestDto.getSchema(),
    updateSchema: CasbinRuleCreateRequestDto.getSchema().partial(),
    xlsxColumns: [
        { key: 'id', readonly: true, width: 38 },
        { key: 'createdTime', readonly: true, width: 24 },
        { key: 'updatedTime', readonly: true, width: 24 },
        { key: 'ptype' },
        { key: 'p0' },
        { key: 'p1' },
        { key: 'p2' },
        { key: 'p3' },
        { key: 'p4' },
        { key: 'p5' },
    ],
} satisfies DatabaseResourceSchema<any, any, any>;

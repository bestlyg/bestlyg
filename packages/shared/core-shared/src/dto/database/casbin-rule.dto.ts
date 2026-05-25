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

/** Casbin 规则分页查询请求 DTO。 */
export class CasbinRulePageRequestDto extends createZodModel(DatabasePageRequestDto.getSchema()) {}

/** 创建 Casbin 规则请求 DTO。 */
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

/** 更新 Casbin 规则请求 DTO，至少需要提交一个可更新字段。 */
export class CasbinRuleUpdateRequestDto extends createZodModel(
    CasbinRuleCreateRequestDto.getSchema()
        .partial()
        .refine(
            (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
            { message: '请求体至少需要包含一个字段' },
        ),
) {}

/** 批量创建 Casbin 规则请求 DTO。 */
export class CasbinRuleBatchCreateRequestDto extends createZodModel(
    z.array(CasbinRuleCreateRequestDto.getSchema()).min(1),
) {}

/** 批量更新 Casbin 规则请求 DTO。 */
export class CasbinRuleBatchUpdateRequestDto extends createZodModel(
    z.object({
        ids: z.array(idSchema).min(1),
        data: CasbinRuleCreateRequestDto.getSchema()
            .partial()
            .refine(
                (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
                { message: '批量更新数据至少需要包含一个字段' },
            ),
    }),
) {}

/** Casbin 规则响应 DTO。 */
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

/** Casbin 规则列表响应 DTO。 */
export class CasbinRuleListResponseDto extends createZodModel(
    z.array(CasbinRuleResponseDto.getSchema()),
) {}

/** Casbin 规则分页响应 DTO。 */
export class CasbinRulePageResponseDto extends createZodModel(
    PageData.schema(CasbinRuleResponseDto.getSchema()),
) {}

/** 批量创建 Casbin 规则响应 DTO。 */
export class CasbinRuleBatchCreateResponseDto extends createZodModel(
    z.array(CasbinRuleResponseDto.getSchema()),
) {}

/** Casbin 规则 XLSX 新增导入响应 DTO。 */
export class CasbinRuleImportResponseDto extends createZodModel(
    DatabaseXlsxImportResponseDto.getSchema().extend({
        data: z.array(CasbinRuleResponseDto.getSchema()),
    }),
) {}

/** Casbin 规则 XLSX 更新导入响应 DTO。 */
export class CasbinRuleImportUpdateResponseDto extends createZodModel(
    DatabaseImportUpdateResponseDto.getSchema(),
) {}

/** Casbin 规则 XLSX 导出响应 DTO。 */
export class CasbinRuleExportResponseDto extends createZodModel(
    DatabaseXlsxExportResponseDto.getSchema(),
) {}

/** Casbin 规则写操作响应 DTO。 */
export class CasbinRuleWriteResponseDto extends createZodModel(
    DatabaseWriteResponseDto.getSchema(),
) {}

/** 前端消费的 Casbin 规则 DTO。 */
export type CasbinRule = z.output<ReturnType<typeof CasbinRuleResponseDto.getSchema>>;

/** Casbin 规则资源的 XLSX 导入导出配置。 */
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

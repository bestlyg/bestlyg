import { z } from 'zod';
import { PageData } from '../../page-data';
import {
    DatabasePageRequestSchema,
    DatabaseWriteResponseSchema,
    EntityBaseResponseSchema,
    idSchema,
} from './common.dto';
import {
    DatabaseImportUpdateResponseSchema,
    DatabaseResourceSchema,
    DatabaseXlsxExportResponseSchema,
    DatabaseXlsxImportResponseSchema,
} from './xlsx.dto';

/** Casbin 规则分页查询请求 DTO。 */
export const CasbinRulePageRequestSchema = DatabasePageRequestSchema;
export type CasbinRulePageRequestDto = z.output<typeof CasbinRulePageRequestSchema>;

/** 创建 Casbin 规则请求 DTO。 */
export const CasbinRuleCreateRequestSchema = z
    .object({
        ptype: z.coerce.string().trim().min(1),
        p0: z.coerce.string().trim().min(1),
        p1: z.coerce.string().trim().min(1),
        p2: z.coerce.string().trim().min(1),
        p3: z.coerce.string().trim().min(1),
        p4: z.coerce.string().trim().min(1),
        p5: z.coerce.string().trim().min(1),
    })
    .strict();
export type CasbinRuleCreateRequestDto = z.output<typeof CasbinRuleCreateRequestSchema>;

/** 更新 Casbin 规则请求 DTO，至少需要提交一个可更新字段。 */
export const CasbinRuleUpdateRequestSchema = CasbinRuleCreateRequestSchema.partial().refine(
    (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
    { message: '请求体至少需要包含一个字段' },
);
export type CasbinRuleUpdateRequestDto = z.output<typeof CasbinRuleUpdateRequestSchema>;

/** 批量创建 Casbin 规则请求 DTO。 */
export const CasbinRuleBatchCreateRequestSchema = z.array(CasbinRuleCreateRequestSchema).min(1);
export type CasbinRuleBatchCreateRequestDto = z.output<typeof CasbinRuleBatchCreateRequestSchema>;

/** 批量更新 Casbin 规则请求 DTO。 */
export const CasbinRuleBatchUpdateRequestSchema = z.object({
    ids: z.array(idSchema).min(1),
    data: CasbinRuleCreateRequestSchema.partial().refine(
        (value) => Boolean(value && typeof value === 'object' && Object.keys(value).length),
        { message: '批量更新数据至少需要包含一个字段' },
    ),
});
export type CasbinRuleBatchUpdateRequestDto = z.output<typeof CasbinRuleBatchUpdateRequestSchema>;

/** Casbin 规则响应 DTO。 */
export const CasbinRuleResponseSchema = EntityBaseResponseSchema.extend({
    ptype: z.string(),
    p0: z.string(),
    p1: z.string(),
    p2: z.string(),
    p3: z.string(),
    p4: z.string(),
    p5: z.string(),
});
export type CasbinRuleResponseDto = z.output<typeof CasbinRuleResponseSchema>;

/** Casbin 规则列表响应 DTO。 */
export const CasbinRuleListResponseSchema = z.array(CasbinRuleResponseSchema);
export type CasbinRuleListResponseDto = z.output<typeof CasbinRuleListResponseSchema>;

/** Casbin 规则分页响应 DTO。 */
export const CasbinRulePageResponseSchema = PageData.schema(CasbinRuleResponseSchema);
export type CasbinRulePageResponseDto = z.output<typeof CasbinRulePageResponseSchema>;

/** 批量创建 Casbin 规则响应 DTO。 */
export const CasbinRuleBatchCreateResponseSchema = z.array(CasbinRuleResponseSchema);
export type CasbinRuleBatchCreateResponseDto = z.output<typeof CasbinRuleBatchCreateResponseSchema>;

/** Casbin 规则 XLSX 新增导入响应 DTO。 */
export const CasbinRuleImportResponseSchema = DatabaseXlsxImportResponseSchema.extend({
    data: z.array(CasbinRuleResponseSchema),
});
export type CasbinRuleImportResponseDto = z.output<typeof CasbinRuleImportResponseSchema>;

/** Casbin 规则 XLSX 更新导入响应 DTO。 */
export const CasbinRuleImportUpdateResponseSchema = DatabaseImportUpdateResponseSchema;
export type CasbinRuleImportUpdateResponseDto = z.output<
    typeof CasbinRuleImportUpdateResponseSchema
>;

/** Casbin 规则 XLSX 导出响应 DTO。 */
export const CasbinRuleExportResponseSchema = DatabaseXlsxExportResponseSchema;
export type CasbinRuleExportResponseDto = z.output<typeof CasbinRuleExportResponseSchema>;

/** Casbin 规则写操作响应 DTO。 */
export const CasbinRuleWriteResponseSchema = DatabaseWriteResponseSchema;
export type CasbinRuleWriteResponseDto = z.output<typeof CasbinRuleWriteResponseSchema>;

/** 前端消费的 Casbin 规则 DTO。 */
export type CasbinRule = CasbinRuleResponseDto;

/** Casbin 规则资源的 XLSX 导入导出配置。 */
export const casbinRuleResourceSchema = {
    resourceName: 'casbin-rule',
    createSchema: CasbinRuleCreateRequestSchema,
    updateSchema: CasbinRuleCreateRequestSchema.partial(),
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

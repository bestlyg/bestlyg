import { z } from 'zod';
import { SortOrderEnum } from './sort-order-enum';
import { createZodModel, type ZodModelConfig } from './zod';

/** 单字段排序参数。 */
export class SortParamItem {
    static default: {
        field: SortParamItem['field'];
        order: SortParamItem['order'];
    } = Object.freeze({
        field: '',
        order: SortOrderEnum.Asc,
    });
    static fields = {
        field: z.coerce.string().trim().default(SortParamItem.default.field),
        order: z.enum([SortOrderEnum.Asc, SortOrderEnum.Desc]).default(SortParamItem.default.order),
    };
    static schema = z.object(SortParamItem.fields).strip();
    static Schema = SortParamItem.schema;

    /** 使用字段名和排序方向创建排序项。 */
    static of(...args: ConstructorParameters<typeof SortParamItem>) {
        return new SortParamItem(...args);
    }

    /** 创建排序项 schema，可用自定义字段 schema 限制允许排序的字段名。 */
    static createSchema<FieldSchema extends z.ZodType<string> = z.ZodString>(
        fieldSchema?: FieldSchema,
    ) {
        return z
            .object({
                field: fieldSchema ?? this.fields.field,
                order: this.fields.order,
            })
            .strip();
    }

    /** 创建绑定排序项 schema 的 ZodModel 父类。 */
    static model(config: ZodModelConfig = {}) {
        return createZodModel(this.schema, config);
    }

    /** 校验排序项对象并恢复为 SortParamItem 实例。 */
    static parse(object?: z.input<typeof SortParamItem.schema>) {
        return this.from(object);
    }

    /** 从普通对象恢复排序项，缺省时使用默认升序配置。 */
    static from(object?: Record<string, any>) {
        const parsed = this.schema.parse(object ?? {});
        return this.of(parsed.field, parsed.order);
    }

    field: string;
    order: SortOrderEnum;
    constructor(field: SortParamItem['field'], order: SortParamItem['order']) {
        this.field = field;
        this.order = order;
    }

    /** 获取排序字段名。 */
    getField() {
        return this.field;
    }

    /** 设置排序字段名，并返回当前实例。 */
    setField(field: SortParamItem['field']) {
        this.field = field;
        return this;
    }

    /** 获取排序方向。 */
    getOrder() {
        return this.order;
    }

    /** 设置排序方向，并返回当前实例。 */
    setOrder(order: SortParamItem['order']) {
        this.order = order;
        return this;
    }

    /** 判断是否升序。 */
    isAsc() {
        return this.order === SortOrderEnum.Asc;
    }

    /** 判断是否降序。 */
    isDesc() {
        return this.order === SortOrderEnum.Desc;
    }

    /** 导出普通排序项对象。 */
    toObject() {
        return {
            field: this.field,
            order: this.order,
        };
    }
}

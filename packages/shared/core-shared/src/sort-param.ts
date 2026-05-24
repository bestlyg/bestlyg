import { z } from 'zod';
import { SortParamItem } from './sort-param-item';
import { createZodModel, type ZodModelConfig } from './zod';

/** 多字段排序参数集合。 */
export class SortParam {
    static default: { items: SortParam['items'] } = Object.freeze({ items: [] });
    static fields = {
        items: z.preprocess((value) => {
            if (typeof value !== 'string') return value;

            const trimmed = value.trim();
            return trimmed ? JSON.parse(trimmed) : undefined;
        }, z.array(SortParamItem.schema).default([])),
    };
    static schema = z.object(SortParam.fields).strip();
    static Schema = SortParam.schema;

    static of(...args: ConstructorParameters<typeof SortParam>) {
        return new SortParam(...args);
    }

    /** 创建排序集合 schema，可传入自定义排序项 schema 限制字段。 */
    static createSchema<ItemSchema extends z.ZodType = typeof SortParamItem.schema>(
        itemSchema?: ItemSchema,
    ) {
        return z
            .object({
                items: z.preprocess(
                    (value) => {
                        if (typeof value !== 'string') return value;

                        const trimmed = value.trim();
                        return trimmed ? JSON.parse(trimmed) : undefined;
                    },
                    z.array(itemSchema ?? SortParamItem.schema).default([]),
                ),
            })
            .strip();
    }

    /** 创建绑定排序集合 schema 的 ZodModel 父类。 */
    static model(config: ZodModelConfig = {}) {
        return createZodModel(this.schema, config);
    }

    /** 校验排序集合对象并恢复为 SortParam 实例。 */
    static parse(object?: z.input<typeof SortParam.schema>) {
        return this.from(object);
    }

    /** 从普通对象恢复排序参数。 */
    static from(object?: Record<string, any>) {
        const parsed = this.schema.parse(object ?? {});
        return this.of(parsed.items.map((item) => SortParamItem.from(item)));
    }

    items: SortParamItem[];
    constructor(items: SortParam['items']) {
        this.items = items;
    }

    /** 获取排序项列表。 */
    getItems() {
        return this.items;
    }

    /** 设置排序项列表，并返回当前实例。 */
    setItems(items: SortParam['items']) {
        this.items = items;
        return this;
    }

    /** 追加一个排序项，并返回当前实例。 */
    addItem(item: SortParamItem) {
        this.items.push(item);
        return this;
    }

    /** 清空排序项。 */
    clear() {
        this.items = [];
        return this;
    }

    /** 判断是否没有排序项。 */
    isEmpty() {
        return this.items.length === 0;
    }

    /** 转成 TypeORM order 常用对象。 */
    toOrder() {
        return Object.fromEntries(
            this.items.filter((item) => item.field).map((item) => [item.field, item.order]),
        );
    }

    /** 导出普通排序查询对象。 */
    toObject() {
        return {
            items: this.items.map((item) => item.toObject()),
        };
    }
}

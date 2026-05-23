import { SortParamItem } from './sort-param-item';

/** 多字段排序参数集合。 */
export class SortParam {
    static default: { items: SortParam['items'] } = Object.freeze({ items: [] });
    static of(...args: ConstructorParameters<typeof SortParam>) {
        return new SortParam(...args);
    }

    /** 从普通对象恢复排序参数。 */
    static from(object?: Record<string, any>) {
        return this.of(object?.items ?? this.default.items);
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
}

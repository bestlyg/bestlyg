import { SortParamItem } from './sort-param-item';

export class SortParam {
    static default: { items: SortParam['items'] } = Object.freeze({ items: [] });
    static of(...args: ConstructorParameters<typeof SortParam>) {
        return new SortParam(...args);
    }
    static from(object?: Record<string, any>) {
        return this.of(object?.items ?? this.default.items);
    }
    items: SortParamItem[];
    constructor(items: SortParam['items']) {
        this.items = items;
    }
    getItems() {
        return this.items;
    }
    setItems(items: SortParam['items']) {
        this.items = items;
        return this;
    }
}

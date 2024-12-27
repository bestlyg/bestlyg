import { SortParamItem } from './sort-param-item';

export class SortParam {
    static of(...args: ConstructorParameters<typeof SortParam>) {
        return new SortParam(...args);
    }
    static ofEmpty() {
        return this.of([]);
    }
    static from(object: Record<string, any>) {
        return this.ofEmpty().setItems(object.items);
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

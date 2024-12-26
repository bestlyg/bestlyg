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
    _items: SortParamItem[];
    get items() {
        return this._items;
    }
    constructor(items: SortParam['items']) {
        this._items = items;
    }
    setItems(items: SortParam['items']) {
        this._items = items;
        return this;
    }
}

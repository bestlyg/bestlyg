import { SortOrderEnum } from './sort-order-enum';

export class SortParamItem {
    static of(...args: ConstructorParameters<typeof SortParamItem>) {
        return new SortParamItem(...args);
    }
    static from(object: Record<string, any>) {
        return this.of('', SortOrderEnum.Asc).setField(object.field).setOrder(object.order);
    }
    _field: string;
    get field() {
        return this._field;
    }
    _order: SortOrderEnum;
    get order() {
        return this._order;
    }
    constructor(field: SortParamItem['field'], order: SortParamItem['order']) {
        this._field = field;
        this._order = order;
    }
    setField(field: SortParamItem['field']) {
        this._field = field;
        return this;
    }
    setOrder(order: SortParamItem['order']) {
        this._order = order;
        return this;
    }
    isAsc() {
        return this.order === SortOrderEnum.Asc;
    }
    isDesc() {
        return this.order === SortOrderEnum.Desc;
    }
}

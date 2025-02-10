import { SortOrderEnum } from './sort-order-enum';

export class SortParamItem {
    static of(...args: ConstructorParameters<typeof SortParamItem>) {
        return new SortParamItem(...args);
    }
    static from(object: Record<string, any>) {
        return this.of('', SortOrderEnum.Asc).setField(object.field).setOrder(object.order);
    }
    field: string;
    order: SortOrderEnum;
    constructor(field: SortParamItem['field'], order: SortParamItem['order']) {
        this.field = field;
        this.order = order;
    }
    getField() {
        return this.field;
    }
    setField(field: SortParamItem['field']) {
        this.field = field;
        return this;
    }
    getOrder() {
        return this.order;
    }
    setOrder(order: SortParamItem['order']) {
        this.order = order;
        return this;
    }
    isAsc() {
        return this.order === SortOrderEnum.Asc;
    }
    isDesc() {
        return this.order === SortOrderEnum.Desc;
    }
}

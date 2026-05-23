import { SortOrderEnum } from './sort-order-enum';

/** 单字段排序参数。 */
export class SortParamItem {
    static default: {
        field: SortParamItem['field'];
        order: SortParamItem['order'];
    } = Object.freeze({
        field: '',
        order: SortOrderEnum.Asc,
    });

    /** 使用字段名和排序方向创建排序项。 */
    static of(...args: ConstructorParameters<typeof SortParamItem>) {
        return new SortParamItem(...args);
    }

    /** 从普通对象恢复排序项，缺省时使用默认升序配置。 */
    static from?(object?: Record<string, any>) {
        return this.of(object?.field ?? this.default.field, object?.order ?? this.default.order);
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
}

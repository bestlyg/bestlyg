/** 分页接口返回结构，封装列表和总数。 */
export class PageData<T> {
    static default: { list: PageData<any>['list']; total: PageData<any>['total'] } = Object.freeze({
        list: [],
        total: 0,
    });

    /** 创建空分页数据。 */
    static ofDefault<T>() {
        return this.of<T>(this.default.list, this.default.total);
    }

    /** 创建空分页数据，语义上用于无结果场景。 */
    static ofEmpty<T>() {
        return this.ofDefault<T>();
    }

    /** 使用 list 和 total 创建分页数据。 */
    static of<T>(...args: ConstructorParameters<typeof PageData<T>>) {
        return new PageData(...args);
    }

    /** 从普通对象恢复分页数据，缺省字段使用空分页默认值。 */
    static from<T>(object?: Record<string, any>) {
        return this.of<T>(object?.list ?? this.default.list, object?.total ?? this.default.total);
    }
    list: T[];
    total: number;
    constructor(list: PageData<T>['list'], total: PageData<T>['total']) {
        this.list = list;
        this.total = total;
    }

    /** 获取当前页数据列表。 */
    getList() {
        return this.list;
    }

    /** 设置当前页数据列表，并返回当前实例。 */
    setList(list: PageData<T>['list']) {
        this.list = list;
        return this;
    }

    /** 获取总条数。 */
    getTotal() {
        return this.total;
    }

    /** 设置总条数，并返回当前实例。 */
    setTotal(total: PageData<T>['total']) {
        this.total = total;
        return this;
    }
}

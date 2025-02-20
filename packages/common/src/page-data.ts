export class PageData<T> {
    static default: { list: PageData<any>['list']; total: PageData<any>['total'] } = Object.freeze({
        list: [],
        total: 0,
    });
    static ofDefault<T>() {
        return this.of<T>(this.default.list, this.default.total);
    }
    static of<T>(...args: ConstructorParameters<typeof PageData<T>>) {
        return new PageData(...args);
    }
    static from<T>(object?: Record<string, any>) {
        return this.of<T>(object?.list ?? this.default.list, object?.total ?? this.default.total);
    }
    list: T[];
    total: number;
    constructor(list: PageData<T>['list'], total: PageData<T>['total']) {
        this.list = list;
        this.total = total;
    }
    getList() {
        return this.list;
    }
    setList(list: PageData<T>['list']) {
        this.list = list;
        return this;
    }
    getTotal() {
        return this.total;
    }
    setTotal(total: PageData<T>['total']) {
        this.total = total;
        return this;
    }
}

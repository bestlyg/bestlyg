export class PageData<T> {
    static of<T>(...args: ConstructorParameters<typeof PageData<T>>) {
        return new PageData(...args);
    }
    static ofEmpty<T>(): PageData<T> {
        return new PageData([], 0);
    }
    static from<T>(object: Record<string, any>) {
        return this.ofEmpty<T>().setList(object.list).setTotal(object.total);
    }
    private list: T[];
    private total: number;
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

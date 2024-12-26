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
    private _list: T[];
    private _total: number;
    get list() {
        return this._list;
    }
    get total() {
        return this._total;
    }
    constructor(list: PageData<T>['list'], total: PageData<T>['total']) {
        this._list = list;
        this._total = total;
    }
    setList(list: PageData<T>['list']) {
        this._list = list;
        return this;
    }
    setTotal(total: PageData<T>['total']) {
        this._total = total;
        return this;
    }
}

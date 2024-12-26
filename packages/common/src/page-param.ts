export class PageParam {
    static of(...args: ConstructorParameters<typeof PageParam>) {
        return new PageParam(...args);
    }
    static from(object: Record<string, any>) {
        return this.of(0, 0).setCurrent(object.list).setPageSize(object.total);
    }
    _current: number;
    get current() {
        return this._current;
    }
    _pageSize: number;
    get pageSize() {
        return this._pageSize;
    }
    constructor(current: PageParam['current'], pageSize: PageParam['pageSize']) {
        this._current = current;
        this._pageSize = pageSize;
    }
    setCurrent(current: number) {
        this._current = current;
        return this;
    }
    setPageSize(pageSize: number) {
        this._pageSize = pageSize;
        return this;
    }
}

export class PageParam {
    static of(...args: ConstructorParameters<typeof PageParam>) {
        return new PageParam(...args);
    }
    static from(object: Record<string, any>) {
        return this.of(0, 0).setCurrent(object.list).setPageSize(object.total);
    }
    current: number;
    pageSize: number;
    constructor(current: PageParam['current'], pageSize: PageParam['pageSize']) {
        this.current = current;
        this.pageSize = pageSize;
    }
    getCurrent() {
        return this.current;
    }
    setCurrent(current: number) {
        this.current = current;
        return this;
    }
    getPageSize() {
        return this.pageSize;
    }
    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        return this;
    }
}

import z from 'zod';
export class PageParam {
    static default: { current: PageParam['current']; pageSize: PageParam['pageSize'] } =
        Object.freeze({ current: 1, pageSize: 10 });
    static of(...args: ConstructorParameters<typeof PageParam>) {
        return new PageParam(...args);
    }
    static from(object?: Record<string, any>) {
        return this.of(
            object?.current ?? this.default.current,
            object?.pageSize ?? this.default.pageSize,
        );
    }
    static Schema = z
        .object({
            current: z.coerce.number().readonly(),
            pageSize: z.coerce.number().readonly(),
        })
        .required();
    current: number;
    pageSize: number;
    get take() {
        return this.pageSize;
    }
    get skip() {
        return (this.current - 1) * this.pageSize;
    }
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

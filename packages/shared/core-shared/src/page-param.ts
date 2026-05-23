import z from 'zod';

/** 分页查询参数，提供 TypeORM 常用的 take/skip 计算。 */
export class PageParam {
    static default: { current: PageParam['current']; pageSize: PageParam['pageSize'] } =
        Object.freeze({ current: 1, pageSize: 10 });
    static of(...args: ConstructorParameters<typeof PageParam>) {
        return new PageParam(...args);
    }

    /** 从普通对象解析分页参数，缺省时使用默认第一页和每页 10 条。 */
    static from(object?: Record<string, any>) {
        const parsed = this.Schema.parse({
            current: object?.current ?? this.default.current,
            pageSize: object?.pageSize ?? this.default.pageSize,
        });
        return this.of(parsed.current, parsed.pageSize);
    }
    static Schema = z
        .object({
            current: z.coerce
                .number()
                .int()
                .positive()
                .meta({ title: '分页参数', description: '定义当前是第几页' }),
            pageSize: z.coerce
                .number()
                .int()
                .positive()
                .meta({ title: '分页参数', description: '定义每页有多少条' }),
        })
        .required();
    current: number;
    pageSize: number;

    /** TypeORM take 参数。 */
    get take() {
        return this.pageSize;
    }

    /** TypeORM skip 参数。 */
    get skip() {
        return (this.current - 1) * this.pageSize;
    }
    constructor(current: PageParam['current'], pageSize: PageParam['pageSize']) {
        this.current = current;
        this.pageSize = pageSize;
    }

    /** 获取当前页码。 */
    getCurrent() {
        return this.current;
    }

    /** 设置当前页码，并返回当前实例。 */
    setCurrent(current: number) {
        this.current = current;
        return this;
    }

    /** 获取每页条数。 */
    getPageSize() {
        return this.pageSize;
    }

    /** 设置每页条数，并返回当前实例。 */
    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        return this;
    }
}

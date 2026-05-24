import { z } from 'zod';
import { createZodModel, type ZodModelConfig } from './zod';

/** 分页查询参数，提供 TypeORM 常用的 take/skip 计算。 */
export class PageParam {
    static default: { current: PageParam['current']; pageSize: PageParam['pageSize'] } =
        Object.freeze({ current: 1, pageSize: 10 });
    static fields = {
        current: z.coerce
            .number()
            .int()
            .positive()
            .default(PageParam.default.current)
            .meta({ title: '分页参数', description: '定义当前是第几页' }),
        pageSize: z.coerce
            .number()
            .int()
            .positive()
            .default(PageParam.default.pageSize)
            .meta({ title: '分页参数', description: '定义每页有多少条' }),
    };
    static schema = z.object(PageParam.fields).strip();
    static Schema = PageParam.schema;

    static of(...args: ConstructorParameters<typeof PageParam>) {
        return new PageParam(...args);
    }

    /** 创建分页查询 schema，可额外合并业务查询字段。 */
    static createSchema<Shape extends z.ZodRawShape = Record<never, never>>(shape?: Shape) {
        return z.object({ ...(shape ?? {}), ...this.fields }).strip();
    }

    /** 将已有查询对象 schema 扩展成分页查询 schema。 */
    static mergeSchema<Shape extends z.ZodRawShape>(schema: z.ZodObject<Shape>) {
        return schema.extend(this.fields).strip();
    }

    /** 创建绑定分页 schema 的 ZodModel 父类。 */
    static model(config: ZodModelConfig = {}) {
        return createZodModel(this.schema, config);
    }

    /** 校验分页查询对象并恢复为 PageParam 实例。 */
    static parse(object?: z.input<typeof PageParam.schema>) {
        return this.from(object);
    }

    /** 从普通对象解析分页参数，缺省时使用默认第一页和每页 10 条。 */
    static from(object?: Record<string, any>) {
        const parsed = this.schema.parse(object ?? {});
        return this.of(parsed.current, parsed.pageSize);
    }

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

    /** TypeORM find options 常用分页片段。 */
    get findOptions() {
        return {
            take: this.take,
            skip: this.skip,
        };
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

    /** 导出普通查询对象。 */
    toObject() {
        return {
            current: this.current,
            pageSize: this.pageSize,
        };
    }
}

import { z } from 'zod';
import { createZodModel, type ZodModelConfig } from './zod';

/** 分页接口返回结构，封装列表和总数。 */
export class PageData<T> {
    static default: { list: PageData<any>['list']; total: PageData<any>['total'] } = Object.freeze({
        list: [],
        total: 0,
    });

    /** 创建分页返回结构的 Zod schema。 */
    static schema<ItemSchema extends z.ZodType>(itemSchema: ItemSchema) {
        return z.object({
            list: z.array(itemSchema),
            total: z.number().int().nonnegative(),
        });
    }

    /** schema 的语义化别名，用于调用处读起来更像创建 DTO schema。 */
    static createSchema<ItemSchema extends z.ZodType>(itemSchema: ItemSchema) {
        return this.schema(itemSchema);
    }

    /** 创建绑定分页 schema 的 ZodModel 父类，便于业务 DTO class extends。 */
    static model<ItemSchema extends z.ZodType>(
        itemSchema: ItemSchema,
        config: ZodModelConfig = {},
    ) {
        return createZodModel(this.schema(itemSchema), config);
    }

    /** 使用 item schema 校验普通对象，并恢复为 PageData 实例。 */
    static parse<ItemSchema extends z.ZodType>(
        itemSchema: ItemSchema,
        object?: z.input<ReturnType<typeof PageData.schema<ItemSchema>>>,
    ) {
        const parsed = this.schema(itemSchema).parse(object ?? this.default);
        return this.of<z.output<ItemSchema>>(parsed.list, parsed.total);
    }

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

    /** 获取当前页实际返回条数。 */
    getLength() {
        return this.list.length;
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

    /** 映射列表项，同时保留 total。 */
    map<U>(mapper: (item: T, index: number, list: T[]) => U) {
        return PageData.of(this.list.map(mapper), this.total);
    }

    /** 导出普通对象，方便传给 DTO 或 JSON 响应。 */
    toObject() {
        return {
            list: this.list,
            total: this.total,
        };
    }
}

/**
 * 非函数的key
 */
export type NonFunctionKeys<T> = Exclude<
    keyof T,
    { [P in keyof T]: T[P] extends Function ? P : never }[keyof T]
>;

/**
 * 可比较对象接口
 */
export interface Comparable<T> {
    /**
     * @param obj 同类型对象
     * @returns
     * -1 当前对象大，
     * 0 两个对象相等，
     * 1 被判断对象大
     */
    compareTo(obj: T): number;
}

/**
 * 比较器
 */
export type Comparator<T> = (el1: T, el2: T) => number;

/**
 * 统一继承对象接口
 */
export interface IObject {
    /**
     * 哈希值，
     * 给每个对象强制增加hash值，
     * 在哈希判断时可利用哈希值进行模糊判断，
     * 默认所有对象哈希都为0，
     */
    readonly hash: number;
    /**
     * 判断两个对象是否相等，
     * 默认判断是否严格相等
     * @param obj 任意对象
     */
    equals(obj: unknown): boolean;
    toString(): string;
}
/**
 * 统一继承对象抽象类
 */
export abstract class AbstractObject implements IObject {
    get hash(): number {
        return 0;
    }
    equals(obj: unknown): boolean {
        return this === obj;
    }
    toString(): string {
        // return objectToString(this);
        return '';
    }
}

/**
 * 数据结构构造器
 */
export interface StructConstructor {
    new (...args: any): IStruct;
    /**
     * 用以创建派生对象
     */
    readonly [Symbol.species]: StructConstructor;
    /**
     * 结构的原型，
     * 只读
     */
    readonly prototype: IStruct;
    /**
     * 判断某对象是否为某构造器的实例
     * @param instance 实例
     */
    [Symbol.hasInstance](instance: unknown): boolean;
    /**
     * 通用快速生成结构静态方法，需被子类重写
     * @param datas 快速生成结构
     */
    from<T extends IObject>(datas: T[]): IStruct;
    /**
     * 通用快速生成结构静态方法，需被子类重写
     * @param datas 快速生成结构
     */
    of<T extends IObject>(...datas: T[]): IStruct;
}
/**
 * 统一数据结构接口
 */
export interface IStruct extends IObject {
    /**
     * toString时调用返回对应结构
     */
    readonly [Symbol.toStringTag]: string;
    /**
     * 结构内数据量大小
     */
    readonly size: number;
    /**
     * 结构内是否有数据
     */
    readonly empty: boolean;
    /**
     * 清空结构内所有数据
     */
    clear(): void;
    /**
     * 迭代器 部署后可通过for of进行遍历
     */
    [Symbol.iterator](): IterableIterator<unknown>;
    /**
     * 获取迭代器，对应key-vale键值对
     */
    entries(): IterableIterator<[unknown, unknown]>;
    /**
     * 获取键集合
     */
    keys(): IterableIterator<unknown>;
    /**
     * 获取值集合
     */
    values(): IterableIterator<unknown>;
}
/**
 * 统一数据结构抽象类
 */
export abstract class AbstractStruct extends AbstractObject implements IStruct {
    abstract [Symbol.toStringTag]: string;
    abstract [Symbol.iterator](): IterableIterator<unknown>;
    abstract entries(): IterableIterator<[unknown, unknown]>;
    abstract keys(): IterableIterator<unknown>;
    abstract values(): IterableIterator<unknown>;
    protected _size = 0;
    get size(): number {
        return this._size;
    }
    get empty(): boolean {
        return this.size === 0;
    }
    clear(): void {
        this._size = 0;
    }
}
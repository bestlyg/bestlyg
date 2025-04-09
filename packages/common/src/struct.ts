import { AbstractObject, IObject } from './object';

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

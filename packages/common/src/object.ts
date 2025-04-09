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

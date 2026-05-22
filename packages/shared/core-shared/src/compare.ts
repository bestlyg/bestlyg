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

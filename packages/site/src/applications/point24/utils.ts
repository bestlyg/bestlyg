/**
 * 随机数
 * @param min
 * @param max
 * [0, 1)
 * [0, max - min + 1)
 * [min, max + 1)
 */
export function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/** 精确度 */
export const EPSILON = 1e-6;
export function isEqual(num: number, target: number) {
    return Math.abs(target - num) <= EPSILON;
}
/** 类型定义 */
export type Compute24 = (nums: number[], ops: string[], target: number) => string[];
/** 全排列 */
export function permutation<T>({
    list,
    same,
    pickSize,
}: {
    list: T[];
    same: boolean;
    pickSize: number;
}): T[][] {
    const n = list.length;
    const set = new Set<number>();
    const res: T[][] = [];
    dfs();
    return res;
    function dfs(item: T[] = []) {
        if (item.length === pickSize) {
            res.push(item.slice());
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!same && set.has(i)) continue;
            item.push(list[i]);
            set.add(i);
            dfs(item);
            set.delete(i);
            item.pop();
        }
    }
}

export function operation(num1: number, num2: number, op: string): number {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            throw new Error('an unkown operation');
    }
}

import { Comparator } from '@/shared';

/**
 * 读取第一个值当中间值
 */
export const quickSort1 = <T extends any = any>(
    compare: Comparator<T>,
    list: T[],
    left = 0,
    right = list.length - 1,
) => {
    if (left > right) return;
    const base = list[left];
    let l = left;
    let r = right;
    while (l <= r) {
        while (l <= r && compare(list[r], base) >= 0) r--;
        if (l <= r) [list[l++], list[r]] = [list[r], list[l]];
        while (l <= r && compare(list[l], base) <= 0) l++;
        if (l <= r) [list[l], list[r--]] = [list[r], list[l]];
    }
    list[l] = base;
    quickSort1(compare, list, left, l - 1);
    quickSort1(compare, list, l + 1, right);
};
/**
 * 单边递归
 */
export const quickSort2 = <T extends any = any>(
    compare: Comparator<T>,
    list: T[],
    left = 0,
    right = list.length - 1,
) => {
    if (left > right) return;
    while (left <= right) {
        const base = list[left];
        let l = left;
        let r = right;
        while (l <= r) {
            while (l <= r && compare(list[r], base) >= 0) r--;
            if (l <= r) [list[l++], list[r]] = [list[r], list[l]];
            while (l <= r && compare(list[l], base) <= 0) l++;
            if (l <= r) [list[l], list[r--]] = [list[r], list[l]];
        }
        list[l] = base;
        quickSort2(compare, list, l + 1, right);
        right = l - 1;
    }
};
const getMid = <T extends any = any>(compare: Comparator<T>, num1: T, num2: T, num3: T) => {
    if (compare(num1, num2) > 0) [num1, num2] = [num2, num1];
    if (compare(num1, num3) > 0) [num1, num3] = [num3, num1];
    if (compare(num2, num3) > 0) [num2, num3] = [num3, num2];
    return num2;
};
/**
 * 取中间值进行递归
 */
export const quickSort3 = <T extends any = any>(
    compare: Comparator<T>,
    list: T[],
    left = 0,
    right = list.length - 1,
) => {
    while (left <= right) {
        const base = getMid(compare, list[left], list[right], list[(right + left) >> 1]);
        let l = left;
        let r = right;
        do {
            while (compare(list[l], base) < 0) l++;
            while (compare(list[r], base) > 0) r--;
            if (l <= r) [list[l++], list[r--]] = [list[r], list[l]];
        } while (l <= r);
        quickSort3(compare, list, l, right);
        right = r;
    }
};

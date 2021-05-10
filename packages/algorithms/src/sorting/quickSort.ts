import { Comparator } from '@bestlyg/shared';

/**
 * 原地排序
 * 读取第一个值当中间值
 */
export const quickSort1 = <T extends any>(
  compare: Comparator<T>,
  list: T[],
  left = 0,
  right = list.length - 1
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

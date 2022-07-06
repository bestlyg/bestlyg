import { Comparator } from '@/shared';

/**
 * 读取第一个值当中间值
 */
export const mergeSort = <T extends any>(
  compare: Comparator<T>,
  list: T[],
  left = 0,
  right = list.length - 1
) => {
  if (left >= right) return;
  const mid = (left + right) >> 1;
  mergeSort(compare, list, left, mid);
  mergeSort(compare, list, mid + 1, right);
  const tempList = list.slice(left, mid + 1);
  let p1 = 0;
  let p2 = mid + 1;
  let i = left;
  while (p1 <= mid - left) {
    if (p2 > right || compare(tempList[p1], list[p2]) < 0) {
      list[i++] = tempList[p1++];
    } else {
      list[i++] = list[p2++];
    }
  }
};

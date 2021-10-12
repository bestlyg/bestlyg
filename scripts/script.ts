import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function divide(dividend: number, divisor: number): number {
  if (dividend === (-2) ** 31 && divisor === -1) return 2 ** 31 - 1;
  const flag = (dividend ^ divisor) < 0 ? -1 : 1;
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);
  log({
    dividend,
    divisor,
  });
  let ans = 0;
  for (let i = 31; i >= 0; i--) {
    if (dividend >>> i >= divisor) {
      ans += 1 << i;
      dividend -= divisor << i;
    }
  }
  return flag * ans;
}
log([
  // divide(10, 3), divide(-7, 3),
  divide(-2147483648, 1),
]);

import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function chalkReplacer(chalk: number[], k: number): number {
  let sum = 0;
  const sums: number[] = [0];
  const n = chalk.length;
  for (let i = 0; i < n; i++) sums.push((sum += chalk[i]));
  while (k >= sum) k -= sum;
  console.log(k);
  console.log(sums);
  const idx = find(k);
  console.log(idx);
  return idx - 1;
  function find(num: number) {
    let l = 0;
    let r = n;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (sums[mid] > num) r = mid;
      else l = mid + 1;
    }
    console.log(l, r);
    return l;
  }
}
console.log(
  chalkReplacer(
    [
      22, 86, 96, 35, 62, 69, 56, 33, 95, 10, 38, 53, 33, 90, 29, 68, 85, 58, 11, 49, 81, 18, 32,
      96, 40, 75, 49, 26, 60, 71, 15, 94, 31, 99, 12, 81, 10, 19, 7, 73, 35, 56, 100, 15, 37, 89,
      58, 17, 55, 62, 4, 30, 68, 68, 89, 62, 39, 35, 16, 18, 63, 73, 100, 22, 46, 58, 80, 77, 23, 5,
      52, 96, 98, 21, 33, 86, 81, 71, 69, 72, 71, 58, 17, 85, 70, 22, 84, 94, 75, 51, 60, 81, 12,
      22, 13, 33, 53, 58,
    ],
    134221332
  )
);

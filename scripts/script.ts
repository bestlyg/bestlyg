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
1*
 */
function findMinMoves(machines: number[]): number {
  const total = machines.reduce((total, cur) => total + cur, 0);
  const n = machines.length;
  if (total % n !== 0) return -1;
  const avg = ~~(total / n);
  let ans = 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const num = machines[i] - avg;
    sum += num;
    ans = Math.max(ans, Math.max(num, Math.abs(sum)));
  }
  return ans;
}
log({
  ans1: findMinMoves([1, 0, 5]),
  ans2: findMinMoves([4, 1, 4, 1, 0]),
  ans3: findMinMoves([0, 0, 11, 5]),
  ans4: findMinMoves([0, 3, 0]),
  ans5: findMinMoves([0, 3, 0]),
  ans6: findMinMoves([0, 3, 0]),
});

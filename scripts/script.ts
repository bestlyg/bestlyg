import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function sumOddLengthSubarrays(arr: number[]): number {
  const n = arr.length;
  const sums = [0];
  arr.forEach(v => sums.push(v + sums[sums.length - 1]));
  let ans = 0;
  // for (let i = 1; i <= n; i += 2) ans += sums[i];
  for (let l = 0; l <= n; l++) {
    for (let r = l + 1; r <= n; r += 2) {
      ans += sums[r] - sums[l];
    }
  }
  return ans;
}

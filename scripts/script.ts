import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function getMaximumGenerated(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let ans = 1;
  const arr = new Array(n + 1);
  arr[0] = 0;
  arr[1] = 1;
  for (let i = 1; 2 * i + 1 <= n; i++) {
    ans = Math.max(ans, (arr[i * 2] = arr[i]));
    ans = Math.max(ans, (arr[i * 2 + 1] = arr[i] + arr[i + 1]));
  }
  return ans;
}

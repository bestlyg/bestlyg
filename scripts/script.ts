import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
  3
2  4
1  n   
 */
function tribonacci(n: number): number {
  let [t0, t1, t2] = [0, 1, 1];
  if (n === 0) return t0;
  if (n === 1) return t1;
  if (n === 2) return t2;
  n -= 2;
  while (n--) [t0, t1, t2] = [t1, t2, t0 + t1 + t2];
  return t2;
}

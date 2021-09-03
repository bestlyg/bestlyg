import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function smallestK(arr: number[], k: number): number[] {
  const heap = new Heap((t1, t2) => t1 - t2);
  arr.forEach(v => heap.add(v));
  const ans: number[] = [];
  while (k--) ans.push(heap.remove());
  return ans;
}

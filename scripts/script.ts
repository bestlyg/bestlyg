import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function escapeGhosts(ghosts: number[][], target: number[]): boolean {
  const comp = (x: number, y: number): number => Math.abs(x - target[0]) + Math.abs(y - target[1]);
  const distance = comp(0, 0);
  for (const ghost of ghosts) {
    if (comp(...(ghost as [number, number])) <= distance) return false;
  }
  return true;
}

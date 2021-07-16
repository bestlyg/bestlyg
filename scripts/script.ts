import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function search(nums: number[], target: number): number {
  return (
    nums.reduce<Record<number, number>>((record, cur) => {
      record[cur] = (record[cur] ?? 0) + 1;
      return record;
    }, {})[target] ?? 0
  );
}

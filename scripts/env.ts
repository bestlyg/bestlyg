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
function hIndex(citations: number[]): number {
  const len = citations.length;
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (citations[mid] >= len - mid) right = mid - 1;
    else left = mid + 1;
  }
  return len - left;
}
console.log(hIndex([2, 2, 2]));

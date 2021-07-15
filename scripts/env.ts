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
function maximumElementAfterDecrementingAndRearranging(arr: number[]): number {
  arr.sort((a, b) => a - b);
  arr[0] = 1;
  const len = arr.length;
  let ans = 1;
  for (let i = 1; i < len; i++) ans = Math.max(ans, (arr[i] = Math.min(arr[i - 1] + 1, arr[i])));
  return ans;
}
console.log(maximumElementAfterDecrementingAndRearranging([100, 1, 1000]));

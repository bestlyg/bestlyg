import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function majorityElement(nums: number[]): number {
  let candidate = -1;
  let count = 0;
  nums.forEach(num => {
    if (count === 0) candidate = num;
    if (candidate === num) count++;
    else count--;
  });
  count = 0;
  nums.forEach(num => {
    if (candidate === num) count++;
  });
  return count > nums.length / 2 ? count : -1;
}

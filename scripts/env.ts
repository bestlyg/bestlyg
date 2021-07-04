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
function findErrorNums(nums: number[]): number[] {
  const len = nums.length;
  const arr = new Array(len).fill(0);
  for (const num of nums) arr[num - 1]++;
  const ans: number[] = [];
  for (let i = 0; i < len; i++) {
    if (arr[i] === 0) ans[1] = i + 1;
    if (arr[i] === 2) ans[0] = i + 1;
  }
  return ans;
}

import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function firstMissingPositive(nums: number[]): number {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] !== i + 1) {
      if (nums[i] > n || nums[i] <= 0) break;
      if (nums[nums[i] - 1] === nums[i]) continue;
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    }
  }
  let i = 0;
  while (i < n && nums[i] === i + 1) i++;
  return i + 1;
}
console.log(firstMissingPositive([7, 8, 9, 11, 12]));

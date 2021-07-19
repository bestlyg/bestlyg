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
function maxFrequency(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  let ans = 1;
  let right = len - 1;
  let left = right - 1;
  while (left >= 0) {
    const num = nums[right];
    while (left >= 0) {
      const v = num - nums[left];
      if (k < v) break;
      k -= v;
      left--;
    }
    ans = Math.max(ans, right-- - left);
    k += (right - left) * (nums[right + 1] - nums[right]);
  }
  return ans;
}

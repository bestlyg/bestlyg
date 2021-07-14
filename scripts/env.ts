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
function minAbsoluteSumDiff(nums1: number[], nums2: number[]): number {
  const len = nums1.length;
  const nums: number[] = new Array(len).fill(0).map((_, i) => Math.abs(nums1[i] - nums2[i]));
  nums1.sort((a, b) => a - b);
  const sum = nums.reduce((total, cur) => total + cur, 0);
  let ans = sum;
  for (let i = 0; i < len; i++) ans = Math.min(ans, sum - nums[i] + findMin(i));
  return ans % (10 ** 9 + 7);
  function findMin(index: number): number {
    const num2 = nums2[index];
    let left = 0;
    let right = len - 1;
    while (left < right) {
      const mid = (left + right) >> 1;
      const midNum = nums1[mid];
      if (midNum < num2) left = mid + 1;
      else if (midNum > num2) right = mid - 1;
      else {
        left = mid;
        break;
      }
    }
    return Math.min(
      Math.abs(nums1[left] - num2),
      left > 0 ? Math.abs(nums1[left - 1] - num2) : Infinity,
      left < len - 1 ? Math.abs(nums1[left + 1] - num2) : Infinity
    );
  }
}

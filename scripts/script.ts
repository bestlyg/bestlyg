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
function maxSubArray(nums: number[]): number {
  let num = 0;
  const len = nums.length;
  const sums = [0, ...nums.map(v => (num += v))];
  let min = 0;
  let ans = -Infinity;
  for (let i = 0; i < len; i++) {
    const sum = sums[i + 1];
    ans = Math.max(ans, sum - min, nums[i]);
    min = Math.min(min, sum);
  }
  return ans;
}
console.log(maxSubArray([-1]));

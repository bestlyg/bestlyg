import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
  3
2  4
1  n   
 */
function numberOfArithmeticSlices(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(0);
  let ans = 0;
  for (let i = 2; i < n; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) ans += dp[i] = dp[i - 1] + 1;
  }
  console.log(dp);
  return ans;
}
console.log(numberOfArithmeticSlices([1, 2, 3, 4]));

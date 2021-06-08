import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function findTargetSumWays(nums: number[], target: number): number {
  const sum = nums.reduce((total, cur) => total + cur, 0);
  if (target > sum || (sum - target) & 1) return 0;
  const neg = (sum - target) >> 1;
  const len = nums.length;
  const dp = new Array(len + 1).fill(0).map(_ => new Array(neg + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= len; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= num) dp[i][j] += dp[i - 1][j - num];
    }
  }
  return dp[len][neg];
}
console.log(findTargetSumWays([1, 2, 1], 0));

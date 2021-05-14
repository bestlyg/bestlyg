import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
function maxSubArray(nums: number[]): number {
  const len = nums.length;
  const prefixSumList = [0];
  for (let i = 1; i <= len; i++) prefixSumList[i] = prefixSumList[i - 1] + nums[i - 1];
  let min = prefixSumList[0];
  let ans = nums[0];
  for (let i = 1; i <= len; i++)
    ans = Math.max(prefixSumList[i] - (min = Math.min(min, prefixSumList[i - 1])), ans);
  return ans;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

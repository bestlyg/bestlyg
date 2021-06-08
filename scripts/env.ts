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
function lastStoneWeightII(stones: number[]): number {
  const sum = stones.reduce((total, cur) => total + cur, 0);
  const len = stones.length;
  const half = sum >> 1;
  const dp = new Array(len + 1).fill(0).map(_ => new Array(half + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j <= half; j++) {
      if (stones[i] > j) dp[i + 1][j] = dp[i][j];
      else dp[i + 1][j] = dp[i][j] || dp[i][j - stones[i]];
    }
  }
  for (let j = half; j >= 0; j--) if (dp[len][j]) return sum - 2 * j;
  return 0;
}

import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function checkRecord(n: number): number {
  const mod = 10 ** 9 + 7;
  const dp = new Array(n + 1).fill(0).map(_ => new Array(2).fill(0).map(_ => new Array(3).fill(0)));
  dp[0][0][0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 3; k++) {
        dp[i][j][0] = (dp[i][j][0] + dp[i - 1][j][k]) % mod;
      }
    }
    for (let k = 0; k < 3; k++) {
      dp[i][1][0] = (dp[i][1][0] + dp[i - 1][0][k]) % mod;
    }
    for (let j = 0; j < 2; j++) {
      for (let k = 1; k < 3; k++) {
        dp[i][j][k] = (dp[i][j][k] + dp[i - 1][j][k - 1]) % mod;
      }
    }
  }
  let ans = 0;
  for (let j = 0; j < 2; j++) for (let k = 0; k < 3; k++) ans = (ans + dp[n][j][k]) % mod;
  return ans;
}
console.log(checkRecord(10101));

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
function profitableSchemes(
  n: number,
  minProfit: number,
  group: number[],
  profit: number[]
): number {
  const MOD = 1e9 + 7;
  const len = group.length;
  const dp = new Array(len + 1)
    .fill(0)
    .map(_ => new Array(n + 1).fill(0).map(_ => new Array(minProfit + 1).fill(0)));
  dp[0][0][0] = 1;
  for (let i = 1; i <= len; i++) {
    const member = group[i - 1];
    const earn = profit[i - 1];
    for (let j = 0; j <= n; j++) {
      for (let k = 0; k <= minProfit; k++) {
        if (j < member) {
          dp[i][j][k] = dp[i - 1][j][k];
        } else {
          dp[i][j][k] = (dp[i - 1][j][k] + dp[i - 1][j - member][Math.max(0, k - earn)]) % MOD;
        }
      }
    }
  }
  let ans = 0;
  for (let i = 0; i <= n; i++) ans = (ans + dp[len][i][minProfit]) % MOD;
  return ans;
}
console.log(profitableSchemes(5, 3, [2, 2], [2, 3]));

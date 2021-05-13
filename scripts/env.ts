import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function numWays(steps: number, arrLen: number): number {
  const MOD = 10 ** 9 + 7;
  const len = Math.min(arrLen, (steps >> 1) + 1);
  const dp: number[][] = new Array(steps + 1).fill(0).map(_ => new Array(len + 1).fill(0));
  dp[0][0] = 1;
  for (let step = 1; step <= steps; step++) {
    for (let i = 0; i <= len; i++) {
      dp[step][i] =
        (dp[step - 1][i] +
          (i < len - 1 ? dp[step - 1][i + 1] : 0) +
          (i > 0 ? dp[step - 1][i - 1] : 0)) %
        MOD;
    }
  }
  return dp[steps][0];
}
console.log(numWays(47, 38));

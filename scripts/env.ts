import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { min, random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function minCost(houses: number[], cost: number[][], m: number, n: number, target: number): number {
  houses = houses.map(c => --c);
  const dp: number[][][] = new Array(m)
    .fill(0)
    .map(_ => new Array(n).fill(0).map(_ => new Array(target).fill(Infinity)));
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (houses[i] !== -1 && houses[i] !== j) continue;
      for (let k = 0; k < target; ++k) {
        for (let j0 = 0; j0 < n; ++j0) {
          if (j === j0) {
            if (i === 0) {
              if (k === 0) dp[i][j][k] = 0;
            } else {
              dp[i][j][k] = Math.min(dp[i][j][k], dp[i - 1][j][k]);
            }
          } else if (i > 0 && k > 0) {
            dp[i][j][k] = Math.min(dp[i][j][k], dp[i - 1][j0][k - 1]);
          }
        }
        if (dp[i][j][k] !== Infinity && houses[i] === -1) dp[i][j][k] += cost[i][j];
      }
    }
  }
  let ans = Infinity;
  for (let j = 0; j < n; ++j) ans = Math.min(ans, dp[m - 1][j][target - 1]);
  return ans === Infinity ? -1 : ans;
}

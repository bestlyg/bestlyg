import { structures } from './utils';
import { AVLTree } from '@bestlyg/data-structure/src';
import { min, random } from 'lodash';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
function canCross(stones: number[]): boolean {
  const len = stones.length;
  const dp: Set<number>[] = new Array(len).fill(0).map(_ => new Set<number>());
  dp[0].add(0);
  for (let i = 1; i < len; i++) {
    const stone = stones[i];
    for (let j = 0; j < i; j++) {
      const minus = stone - stones[j];
      const set = dp[j];
      if (set.size === 0) continue;
      if (set.has(minus) || set.has(minus - 1) || set.has(minus + 1)) {
        dp[i].add(minus);
      }
    }
  }
  return dp[len - 1].size !== 0;
}
console.log(canCross([0, 1, 3, 5, 6, 8, 12, 17]));
console.log(canCross([0, 2]));

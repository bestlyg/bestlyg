import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { min, random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;

/*
  0 -> 选了
  1 -> 没选
  */
function deleteAndEarn(nums: number[]): number {
  const map = new Map<number, number>();
  nums.forEach(num => map.set(num, (map.get(num) ?? 0) + 1));
  const arr = [...map.keys()].sort((a, b) => a - b);
  const len = arr.length;
  const dp: number[][] = new Array(len).fill(0).map(_ => new Array(2).fill(0));
  dp[0][0] = arr[0] * map.get(arr[0])!;
  for (let i = 1; i < len; i++) {
    const num = arr[i];
    const maxPrev = Math.max(...dp[i - 1]);
    dp[i][1] = maxPrev;
    dp[i][0] = (map.has(num - 1) ? dp[i - 1][1] : maxPrev) + map.get(num)! * num;
  }
  return Math.max(...dp[len - 1]);
}
console.log(deleteAndEarn([1, 1, 1, 2, 4, 5, 5, 5, 6]));

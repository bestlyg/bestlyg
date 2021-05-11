import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
const list = [2, 3, 4, 5, 6, 1, 2];
quickSort3((a, b) => a - b, list);
function decode(encoded: number[]): number[] {
  const n = encoded.length + 1;
  let xorNum = 1;
  for (let i = 2; i <= n; i++) xorNum ^= i;
  for (let i = 1; i < n - 1; i += 2) xorNum ^= encoded[i];
  return [xorNum, ...encoded.map(v => (xorNum ^= v))];
}
console.log(decode([6, 5, 4, 6]));

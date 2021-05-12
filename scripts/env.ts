import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function xorQueries(arr: number[], queries: number[][]): number[] {
  let num = arr[0];
  const prefixSumList: number[] = arr.map((v, i) => (i === 0 ? num : (num ^= v)));
  return queries.map(([start, end]) => prefixSumList[start - 1] ^ prefixSumList[end]);
}
console.log(
  xorQueries(
    [4, 8, 2, 10],
    [
      [2, 3],
      [1, 3],
      [0, 0],
      [0, 3],
    ]
  )
);

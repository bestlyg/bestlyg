import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function kthLargestValue(matrix: number[][], k: number): number {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const prefixSumList: number[][] = new Array(rowLen + 1)
    .fill(0)
    .map(_ => new Array(colLen + 1).fill(0));
  const list: number[] = [];
  for (let row = 1; row <= rowLen; row++) {
    for (let col = 1; col <= colLen; col++) {
      list.push(
        (prefixSumList[row][col] =
          prefixSumList[row - 1][col] ^
          prefixSumList[row][col - 1] ^
          prefixSumList[row - 1][col - 1] ^
          matrix[row - 1][col - 1])
      );
    }
  }
  return list.sort((a, b) => b - a)[k - 1];
}
console.log(
  kthLargestValue(
    [
      [5, 2],
      [1, 6],
    ],
    1
  )
);

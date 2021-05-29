import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function numSubmatrixSumTarget(matrix: number[][], target: number): number {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const prefixSumList: number[][] = new Array(rowLen + 1)
    .fill(0)
    .map(_ => new Array(colLen + 1).fill(0));
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      prefixSumList[row + 1][col + 1] =
        prefixSumList[row + 1][col] +
        prefixSumList[row][col + 1] -
        prefixSumList[row][col] +
        matrix[row][col];
    }
  }
  console.log(prefixSumList);
  let ans = 0;
  for (let endRow = 0; endRow < rowLen; endRow++) {
    for (let endCol = 0; endCol < colLen; endCol++) {
      for (let startRow = 0; startRow <= endRow; startRow++) {
        for (let startCol = 0; startCol <= endCol; startCol++) {
          if (
            prefixSumList[endRow + 1][endCol + 1] -
              prefixSumList[endRow + 1][startCol] -
              prefixSumList[startRow][endCol + 1] +
              prefixSumList[startRow][startCol] ===
            target
          ) {
            ans++;
          }
        }
      }
    }
  }
  return ans;
}
console.log(
  numSubmatrixSumTarget(
    [
      [1, -1],
      [-1, 1],
    ],
    0
  )
);

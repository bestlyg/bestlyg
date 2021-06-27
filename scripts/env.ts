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
function snakesAndLadders(board: number[][]): number {
  const N = board.length;
  const toBlock = (row: number, col: number) => {
    if ((N & 1) === 0) {
      return N * (N - 1 - row) + ((row & 1) === 0 ? N - col : col + 1);
    } else {
      return N * (N - 1 - row) + ((row & 1) === 0 ? col + 1 : N - col);
    }
  };
  const toBoard = (block: number): [number, number] => {
    const row = N - 1 - ~~((block - 1) / N);
    let col!: number;
    if ((N & 1) === 0) {
      col = (row & 1) === 0 ? N - 1 - ((block - 1) % N) : (block - 1) % N;
    } else {
      col = (row & 1) === 0 ? (block - 1) % N : N - 1 - ((block - 1) % N);
    }
    return [row, col];
  };
  const ANS_NUM = N ** 2;
  const map = new Map<number, number>([[1, 0]]);
  let ans = Infinity;
  const queue: [number, number][] = [[N - 1, 0]];
  while (queue.length !== 0) {
    const [row, col] = queue.shift()!;
    const block = toBlock(row, col);
    const step = map.get(block)!;
    if (ANS_NUM - block <= 6) {
      ans = Math.min(ans, step + 1);
      continue;
    }
    for (let i = 1; i <= 6; i++) {
      let nextBlock = block + i;
      let nextBoard = toBoard(nextBlock);
      const [nextRow, nextCol] = nextBoard;
      if (board[nextRow][nextCol] !== -1) {
        nextBlock = board[nextRow][nextCol];
        nextBoard = toBoard(nextBlock);
      }
      if (nextBlock === ANS_NUM) {
        ans = Math.min(ans, step + 1);
        continue;
      }
      if (!map.has(nextBlock)) queue.push(nextBoard);
      map.set(nextBlock, Math.min(map.get(nextBlock) ?? Infinity, step + 1));
    }
  }
  return ans === Infinity ? -1 : ans;
}
console.log(
  snakesAndLadders([
    [-1, -1, 27, 13, -1, 25, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [44, -1, 8, -1, -1, 2, -1],
    [-1, 30, -1, -1, -1, -1, -1],
    [3, -1, 20, -1, 46, 6, -1],
    [-1, -1, -1, -1, -1, -1, 29],
    [-1, 29, 21, 33, -1, -1, -1],
  ])
);
console.log([
  [43, 44, 45, 46, 47, 48, 49],
  [42, 41, 40, 39, 38, 37, 36],
  [29, 30, 31, 32, 33, 34, 35],
  [28, 27, 26, 25, 24, 23, 22],
  [15, 16, 17, 18, 19, 20, 21],
  [14, 13, 12, 11, 10, 9, 8],
  [1, 2, 3, 4, 5, 6, 7],
]);

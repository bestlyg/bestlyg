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
function slidingPuzzle(board: number[][]): number {
  const ANS_STR = '123,450';
  const stringify = (board: (number | string)[][]) => board.map(v => v.join('')).join(',');
  if (stringify(board) === ANS_STR) return 0;
  const parse = (boardStr: string) => boardStr.split(',').map(v => v.split(''));
  const getZeroIndex = (index: number): [number, number] =>
    index <= 2 ? [0, index] : [1, index - 4];
  const queue: string[] = [stringify(board)];
  const map = new Map<string, number>([[queue[0], 0]]);
  let ans = Infinity;
  const updateMap = (newStr: string, step: number) => {
    if (newStr === ANS_STR) ans = Math.min(ans, step + 1);
    else {
      map.has(newStr) || queue.push(newStr);
      map.set(newStr, Math.min(map.get(newStr) ?? Infinity, step + 1));
    }
  };
  const swap = (board: string[][], row1: number, col1: number, row2: number, col2: number) => {
    [board[row1][col1], board[row2][col2]] = [board[row2][col2], board[row1][col1]];
  };
  while (queue.length !== 0) {
    const boardStr = queue.shift()!;
    const step = map.get(boardStr)!;
    const [row, col] = getZeroIndex(boardStr.indexOf('0'));
    const board = parse(boardStr);
    if (row === 0) {
      swap(board, row, col, row + 1, col);
      updateMap(stringify(board), step);
      swap(board, row, col, row + 1, col);
    }
    if (row === 1) {
      swap(board, row, col, row - 1, col);
      updateMap(stringify(board), step);
      swap(board, row, col, row - 1, col);
    }
    if (col > 0) {
      swap(board, row, col, row, col - 1);
      updateMap(stringify(board), step);
      swap(board, row, col, row, col - 1);
    }
    if (col < 2) {
      swap(board, row, col, row, col + 1);
      updateMap(stringify(board), step);
      swap(board, row, col, row, col + 1);
    }
  }
  return ans === Infinity ? -1 : ans;
}
console.log(
  slidingPuzzle([
    [3, 2, 4],
    [1, 5, 0],
  ])
);

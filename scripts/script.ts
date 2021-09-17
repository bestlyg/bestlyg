import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function isValidSudoku(board: string[][]): boolean {
  const rows: Set<string>[] = new Array(9).fill(0).map(_ => new Set<string>());
  const cols: Set<string>[] = new Array(9).fill(0).map(_ => new Set<string>());
  const blocks: Set<string>[] = new Array(9).fill(0).map(_ => new Set<string>());
  const getBolck = (row: number, col: number) => ~~(row / 3) * 3 + ~~(col / 3);
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      const block = getBolck(row, col);
      if (val === '.') continue;
      const rowSet = rows[row];
      const colSet = cols[col];
      const blockSet = blocks[block];
      if (rowSet.has(val) || colSet.has(val) || blockSet.has(val)) return false;
      rowSet.add(val);
      colSet.add(val);
      blockSet.add(val);
    }
  }
  return true;
}

import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap, Trie, TrieNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
type TrieNode = structures.TrieNode;

/*
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  const n = matrix[0].length;
  let row = 0;
  let col = n - 1;
  while (row < m && col >= 0) {
    log({ row, col });
    const num = matrix[row][col];
    if (num === target) return true;
    if (num < target) col--;
    else row++;
  }
  return false;
}
log([
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    5
  ),
]);

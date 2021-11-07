import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const {
  TreeNode,
  UnionFind,
  ListNode,
  Heap,
  // Trie, TrieNode
} = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

/*
 */
function maxCount(m: number, n: number, ops: number[][]): number {
  if (ops.length === 0) return m * n;
  let minA = Infinity;
  let minB = Infinity;
  ops.forEach(([a, b]) => {
    minA = Math.min(minA, a);
    minB = Math.min(minB, b);
  });
  return minA * minB;
}
log([
  maxCount(26, 17, [
    [20, 10],
    [26, 11],
    [2, 11],
    [4, 16],
    [2, 3],
    [23, 13],
    [7, 15],
    [11, 11],
    [25, 13],
    [11, 13],
    [13, 11],
    [13, 16],
    [26, 17],
  ]),
]);

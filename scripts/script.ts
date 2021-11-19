import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
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
6 abcw baz foo bar xtfn abcdef
 */
const map: Record<number, number> = { 1: 0, 2: 1 };
function integerReplacement(n: number): number {
  console.log(n, map);
  if (map[n]) return map[n];
  const ans =
    (n & 1
      ? Math.min(integerReplacement(n + 1), integerReplacement(n - 1))
      : integerReplacement(n >> 1)) + 1;
  return (map[n] = ans);
}
log([integerReplacement(8)]);

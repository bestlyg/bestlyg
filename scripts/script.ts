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
function kthSmallestPrimeFraction(arr: number[], k: number): number[] {
  const n = arr.length;
  const heap = new Heap<[number, number]>((t1, t2) => t2[0] / t2[1] - t1[0] / t1[1]);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      heap.add([i, j]);
    }
  }
  while (k--) heap.remove();
  return heap.remove();
}

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
function longestSubsequence(arr: number[], difference: number): number {
  let max = 1;
  const map = new Map<number, number>();
  for (const num of arr) {
    const cnt = (map.get(num) ?? 0) + 1;
    map.set(num + difference, cnt);
    max = Math.max(max, cnt);
  }
  return max;
}

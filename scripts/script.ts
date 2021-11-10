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
function findPoisonedDuration(timeSeries: number[], duration: number): number {
  let ans = 0;
  const n = timeSeries.length;
  for (let i = 0; i < n - 1; i++) {
    const time = timeSeries[i];
    const next_time = timeSeries[i + 1];
    if (time + duration - 1 >= next_time) ans += next_time - time;
    else ans += duration;
  }
  ans += duration;
  return ans;
}

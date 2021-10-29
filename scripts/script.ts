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
// direction 0 up 1 left 2 bottom 3 right
function isSelfCrossing(distance: number[]): boolean {
  const n = distance.length;
  if (n <= 3) return false;
  for (let i = 3; i < n; i++) {
    if (i >= 3 && distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3]) return true;
    if (
      i >= 4 &&
      distance[i - 1] === distance[i - 3] &&
      distance[i] + distance[i - 4] >= distance[i - 2]
    )
      return true;
    if (
      i >= 5 &&
      distance[i - 1] <= distance[i - 3] &&
      distance[i - 2] > distance[i - 4] &&
      distance[i] + distance[i - 4] >= distance[i - 2] &&
      distance[i - 1] + distance[i - 5] >= distance[i - 3]
    )
      return true;
  }
  return false;
}
log([isSelfCrossing([2, 1, 1, 2]), isSelfCrossing([1, 2, 3, 4]), isSelfCrossing([1, 1, 1, 1])]);

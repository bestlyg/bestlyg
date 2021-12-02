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
function findRelativeRanks(score: number[]): string[] {
  const n = score.length;
  const idxs = new Array(n)
    .fill(0)
    .map((_, i) => i)
    .sort((a, b) => score[b] - score[a]);
  console.log(idxs);
  const ans: string[] = [];
  for (let i = 0; i < n; i++) {
    const str =
      i === 0 ? 'Gold Medal' : i === 1 ? 'Silver Medal' : i === 2 ? 'Bronze Medal' : `${i + 1}`;
    ans[idxs[i]] = str;
  }
  return ans;
}
log([findRelativeRanks([5, 4, 3, 2, 1])]);

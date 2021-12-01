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
function maxPower(s: string): number {
  let ans = 0;
  for (let i = 0, n = s.length; i < n; i++) {
    let cnt = 1;
    const ch = s[i];
    while (i + 1 < n && s[i + 1] === ch) {
      i++;
      cnt++;
    }
    ans = Math.max(ans, cnt);
  }
  return ans;
}

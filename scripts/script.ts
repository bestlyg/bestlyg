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
function maxProduct(words: string[]): number {
  const n = words.length;
  const bit_words = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const word = words[i];
    for (let pos = 0, l = word.length; pos < l; pos++) {
      bit_words[i] |= 1 << (word.codePointAt(pos)! - 97);
    }
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const len1 = words[i].length;
    const bit1 = bit_words[i];
    for (let j = i + 1; j < n; j++) {
      const len2 = words[j].length;
      const bit2 = bit_words[j];
      if (bit1 & bit2) continue;
      ans = Math.max(ans, len1 * len2);
    }
  }
  return ans;
}

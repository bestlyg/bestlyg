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
function getHint(secret: string, guess: string): string {
  const n = secret.length;
  let a = 0;
  let b = 0;
  const map: Record<string, number> = {};
  const list: number[] = [];
  for (let i = 0; i < n; i++) {
    const ch1 = secret[i];
    const ch2 = guess[i];
    if (ch1 === ch2) {
      a++;
      list.push(i);
    } else map[ch1] = (map[ch1] ?? 0) + 1;
  }
  for (let i = 0; i < n; i++) {
    if (list.length && list[0] === i) continue;
    list.shift();
    const ch1 = secret[i];
    const ch2 = guess[i];
    if (map[ch2]) {
      b++;
      map[ch2]--;
    }
  }
  return `${a}A${b}B`;
}

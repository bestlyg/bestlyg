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
const dict: Record<number, string[]> = {
  1: 'one'.split(''),
  2: 'two'.split(''), // w
  3: 'three'.split(''), //t
  4: 'four'.split(''), // u
  5: 'five'.split(''), // f
  6: 'six'.split(''), // x
  7: 'seven'.split(''), // v
  8: 'eight'.split(''), // g
  9: 'nine'.split(''), // i
  0: 'zero'.split(''), // z
};
const checkList = [
  { num: 2, key: 'w' },
  { num: 6, key: 'x' },
  { num: 0, key: 'z' },
  { num: 8, key: 'g' },
  { num: 3, key: 't' },
  { num: 4, key: 'u' },
  { num: 5, key: 'f' },
  { num: 7, key: 'v' },
  { num: 9, key: 'i' },
  { num: 1, key: 'o' },
];
function originalDigits(s: string): string {
  const map: Record<string, number> = {};
  for (const c of s) map[c] = (map[c] ?? 0) + 1;
  const list: number[] = new Array(10).fill(0);
  for (const { num, key } of checkList) {
    if (!map[key]) continue;
    const cnt = map[key];
    list[num] += cnt;
    for (const ch of dict[num]) map[ch] -= cnt;
  }
  return list.reduce((ans, cnt, num) => ans + num.toString().repeat(cnt), '');
}
log([originalDigits('fviefuro')]);

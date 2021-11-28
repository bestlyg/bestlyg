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
function findAnagrams(s: string, p: string): number[] {
  const sn = s.length;
  const pn = p.length;
  if (sn < pn) return [];
  const arr: number[] = new Array(26).fill(0);
  for (let i = 0; i < pn; i++) arr[p.codePointAt(i)! - 97]++;
  const str = arr.join('#');
  arr.fill(0);
  const ans: number[] = [];
  let l = 0;
  let r = 0;
  while (r < pn) arr[s.codePointAt(r++)! - 97]++;
  while (r < sn) {
    if (str === arr.join('#')) ans.push(l);
    arr[s.codePointAt(l++)! - 97]--;
    arr[s.codePointAt(r++)! - 97]++;
  }
  if (str === arr.join('#')) ans.push(l);
  return ans;
}

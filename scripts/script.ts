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
function gcd(a: number, b: number) {
  if (!b) return a;
  return gcd(b, a % b);
}
function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return '';
  return str1.substr(0, gcd(str1.length, str2.length));
}
log([numPrimeArrangements(5)]);

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
class Solution {
  map = new Map<number, number>();
  total: number;
  constructor(public m: number, public n: number) {
    this.total = m * n - 1;
  }
  flip(): number[] {
    let idx = this.random(0, this.total);
    idx = this.map.get(idx) ?? idx;
    this.map.set(idx, this.total--);
    return [Math.floor(idx / this.n), idx % this.n];
  }
  reset(): void {
    this.map.clear();
    this.total = this.m * this.n - 1;
  }
  random(min: number, max: number): number {
    return min + ~~(Math.random() * (max - min + 1));
  }
}

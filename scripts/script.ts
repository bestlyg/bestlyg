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
function findKthNumber(n: number, k: number): number {
  for (let i = 1; i <= 9; i++) {
    const c = count(i);
    log({
      c,
      i,
    });
    if (c < k) k -= c;
    else return find(i, k);
  }
  return 0;
  function find(prifix: number, k: number): number {
    if (k === 1) return prifix;
    k--;
    for (let i = 0; i <= 9; i++) {
      const next = prifix * 10 + i;
      if (next > n) continue;
      const c = count(next);
      log({ prifix, k, c, next });
      if (c >= k) return find(next, k);
      else k -= c;
    }
    return 0;
  }
  function count(prifix: number): number {
    log({ count: 'conunt', prifix });
    let nextPrifix = prifix + 1;
    let ans = 0;
    while (prifix <= n) {
      ans += Math.min(n + 1, nextPrifix) - prifix;
      prifix *= 10;
      nextPrifix *= 10;
    }
    return ans;
  }
}
log([findKthNumber(100, 10)]);

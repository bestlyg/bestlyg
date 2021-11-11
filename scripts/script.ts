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
function kInversePairs(n: number, k: number): number {
  if (k === 0) return 1;
  const MOD = 10 ** 9 + 7;
  const dp: Map<number, number>[] = new Array(2).fill(0).map(_ => new Map());
  dp[0].set(0, 1);
  for (let i = 1; i < n; i++) {
    const map = dp[i % 2];
    map.clear();
    for (const [num, cnt] of dp[(i - 1) % 2].entries()) {
      for (let j = 0; j <= i; j++) {
        if (num + j > k) break;
        const cur = map.get(num + j) ?? 0;
        map.set(num + j, (cur + cnt) % MOD);
      }
    }
  }
  return dp[(n - 1) % 2].get(k) ?? 0;
}

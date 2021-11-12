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
0
1
2
4
6
8  -- 6
10
12
14
16
18
21 -- 12
24
27
30 -- 15
34
38
42 -- 18
46
49 -- 20
52
55
58
61
64 -- 25
 */
function getMoneyAmount(n: number): number {
  const dp: number[][] = new Array(n + 1).fill(0).map(_ => new Array(n + 1).fill(0));
  for (let i = n; i >= 1; i--) {
    for (let j = i + 1; j <= n; j++) {
      let min = Infinity;
      for (let k = i; k < j; k++) {
        min = Math.min(min, k + Math.max(dp[i][k - 1], dp[k + 1][j]));
      }
      dp[i][j] = min;
    }
  }
  return dp[1][n];
}
log([getMoneyAmount(15)]);

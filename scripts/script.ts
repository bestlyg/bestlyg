import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap, Trie, TrieNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
type TrieNode = structures.TrieNode;

/*
 */
function shoppingOffers(price: number[], special: number[][], needs: number[]): number {
  const n = price.length;
  special = special
    .filter(item => {
      let sum = 0;
      for (let i = 0; i < n; i++) sum += item[i] * price[i];
      return sum > item[n];
    })
    .sort((a, b) => a[n] - b[n]);
  let ans = Infinity;
  dfs(needs);
  return ans;
  function dfs(needs: number[], cost = 0) {
    if (needs.every(v => v === 0)) {
      ans = Math.min(cost, ans);
      return;
    }
    const list = special.filter((item: number[]) =>
      item.every((v, i) => (i === n ? true : v <= needs[i]))
    );
    if (list.length === 0) {
      dfs(
        [0],
        needs.reduce((total, v, i) => price[i] * v + total, cost)
      );
    } else {
      list.forEach(item => {
        dfs(
          needs.map((v, i) => v - item[i]),
          item[n] + cost
        );
      });
    }
  }
}
log([
  shoppingOffers(
    [2, 5],
    [
      [3, 0, 5],
      [1, 2, 10],
    ],
    [3, 2]
  ),
]);

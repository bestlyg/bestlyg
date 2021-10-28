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
function reorderedPowerOf2(n: number): boolean {
  if (check(n)) return true;
  const chars = n.toString().split('');
  const len = chars.length;
  const list: number[] = [];
  const set = new Set<number>();
  dfs();
  log({ list });
  for (const num of list) {
    if (check(num)) return true;
  }
  return false;
  function check(num: number) {
    return (
      num
        .toString(2)
        .split('')
        .filter(v => v === '1').length === 1
    );
  }
  function dfs(num = 0) {
    if (set.size === len) {
      list.push(num);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (set.has(i)) continue;
      const ch = chars[i];
      if (num === 0 && ch === '0') continue;
      set.add(i);
      dfs(num * 10 + ch.codePointAt(0)! - '0'.codePointAt(0)!);
      set.delete(i);
    }
  }
}
log([reorderedPowerOf2(16)]);

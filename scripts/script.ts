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
function grayCode(n: number): number[] {
  if (n === 0) return [0];
  const ans = [0, 1];
  if (n === 1) return ans;
  while (--n) {
    ans.push(
      ...Array.from(ans)
        .reverse()
        .map(v => v | (1 << n))
    );
  }
  return ans;
}
log([grayCode(2)]);

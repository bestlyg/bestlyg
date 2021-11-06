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
function longestValidParentheses(s: string): number {
  const stack: string[] = [];
  let ans = 0;
  let cur = 0;
  for (const ch of s) {
    if (ch === '(') {
      stack.push(ch);
    } else if (stack.length === 0) {
      ans = Math.max(ans, cur);
      cur = 0;
    } else {
      stack.pop();
      cur += 2;
    }
  }
  return ans;
}

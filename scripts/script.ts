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
function findLHS(nums: number[]): number {
  const map = new Map<number, number>();
  for (const num of nums) map.set(num, (map.get(num) ?? 0) + 1);
  const list = Array.from(map.entries()).sort(([num1], [num2]) => num1 - num2);
  console.log(list);
  let ans = 0;
  for (let i = 0, l = list.length; i < l - 1; i++) {
    const [num1, cnt1] = list[i];
    const [num2, cnt2] = list[i + 1];
    console.log(num1, num2);
    if (num2 !== num1 + 1) continue;
    console.log(1);
    ans = Math.max(ans, cnt1 + cnt2);
  }
  return ans;
}
log([findLHS([1, 2, 2, 1])]);

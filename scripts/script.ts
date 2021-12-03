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
function largestSumAfterKNegations(nums: number[], k: number): number {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n && nums[i] < 0 && k > 0; i++) {
    nums[i] *= -1;
    k--;
  }
  const sum = nums.reduce((total, num) => total + num, 0);
  if ((k & 1) === 0) return sum;
  return sum - 2 * Math.min(...nums);
}
log([
  largestSumAfterKNegations([-8, 3, -5, -3, -5, -2], 6),
  // largestSumAfterKNegations([3, -1, 0, 2], 3),
  // largestSumAfterKNegations([3, -1, 0, 2], 3),
  // largestSumAfterKNegations([3, -1, 0, 2], 3),
]);

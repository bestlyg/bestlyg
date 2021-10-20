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
function minMoves(nums: number[]): number {
  const min = Math.min(...nums);
  return nums.reduce((ans, num) => ans + num - min, 0);
}

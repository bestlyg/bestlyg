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
function plusOne(digits: number[]): number[] {
  let add = true;
  for (let n = digits.length, i = n - 1; add && i >= 0; i--) {
    if (++digits[i] === 10) digits[i] = 0;
    else add = false;
  }
  if (add) digits.unshift(1);
  return digits;
}

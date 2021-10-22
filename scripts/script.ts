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
function majorityElement(nums: number[]): number[] {
  const n = nums.length;
  let num1 = nums[0];
  let num2 = nums[0];
  let val1 = 0;
  let val2 = 0;
  for (const num of nums) {
    if (val1 > 0 && num === num1) {
      val1++;
    } else if (val2 > 0 && num === num2) {
      val2++;
    } else if (val1 === 0) {
      num1 = num;
      val1++;
    } else if (val2 === 0) {
      num2 = num;
      val2++;
    } else {
      val1--;
      val2--;
    }
  }
  let cnt1 = 0;
  let cnt2 = 0;
  for (const num of nums) {
    if (val1 > 0 && num1 === num) cnt1++;
    if (val2 > 0 && num2 === num) cnt2++;
  }
  const ans: number[] = [];
  if (val1 > 0 && cnt1 > n / 3) ans.push(num1);
  if (val2 > 0 && cnt2 > n / 3) ans.push(num2);
  return ans;
}

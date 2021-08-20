import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function minMoves2(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const midNum = nums[(0 + nums.length - 1) >> 1];
  let ans = 0;
  for (const num of nums) {
    ans += Math.abs(num - midNum);
  }
  return ans;
}

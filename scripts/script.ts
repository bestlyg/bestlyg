import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function lengthOfLIS(nums: number[]): number {
  const list = [nums[0]];
  for (const num of nums) list[find(num)] = num;
  return list.length;
  function find(num: number): number {
    let l = 0;
    let r = list.length - 1;
    if (num > list[r]) return list.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (list[mid] >= num) r = mid;
      else l = mid + 1;
    }
    return l;
  }
}
console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]));

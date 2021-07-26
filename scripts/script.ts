import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */

function lengthOfLIS(nums: number[]): number {
  const list: number[] = [];
  for (const num of nums) list[bs(num)] = num;
  return list.length;
  function bs(target: number, left = 0, right = list.length - 1): number {
    if (list.length === 0) return 0;
    if (target > list[right]) return list.length;
    while (left < right) {
      const mid = (right + left) >> 1;
      if (list[mid] >= target) right = mid;
      else left = mid + 1;
    }
    return left;
  }
}
function minOperations(target: number[], arr: number[]): number {
  const map: Record<number, number> = {};
  for (let i = 0; i < target.length; i++) map[target[i]] = i;
  const list: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const idx = map[arr[i]];
    if (idx === undefined) continue;
    list.push(idx);
  }
  return target.length - lengthOfLIS(list);
}
console.log(
  minOperations([11, 16, 20, 1, 2, 13, 7, 6, 12, 3], [11, 13, 3, 7, 7, 1, 10, 12, 14, 1])
);

import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function numSubarraysWithSum(nums: number[], goal: number): number {
  let ans = 0;
  let sum = 0;
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(sum, (map.get(sum) ?? 0) + 1);
    sum += num;
    ans += map.get(sum - goal) ?? 0;
  }
  return ans;
}
console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2));
console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0));

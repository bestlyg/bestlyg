import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function totalHammingDistance(nums: number[]): number {
  const len = nums.length;
  let ans = 0;
  for (let i = 0; i <= 31; i++) {
    let count = 0;
    nums.forEach(num => (count += (num >> i) & 1));
    ans += count * (len - count);
  }
  return ans;
}

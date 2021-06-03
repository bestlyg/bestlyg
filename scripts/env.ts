import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';

/*

 2 3 4 5 6 7 8 9 10



 */
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function findMaxLength(nums: number[]): number {
  const len = nums.length;
  for (let i = 0; i < len; i++) if (nums[i] === 0) nums[i] = -1;
  let sum = 0;
  let ans = 0;
  const map = new Map<number, number>([[0, -1]]);
  for (let i = 0; i < len; i++) {
    sum += nums[i];
    let prev = map.get(sum);
    if (prev !== undefined) ans = Math.max(ans, i - prev);
    else map.set(sum, i);
  }
  return ans;
}
console.log(findMaxLength([0, 1, 0]));

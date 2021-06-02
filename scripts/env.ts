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
function checkSubarraySum(nums: number[], k: number): boolean {
  const len = nums.length;
  if (len < 2 || k === 0) return false;
  const map = new Map<number, number>([[0, -1]]);
  let num = 0;
  for (let i = 0; i < len; i++) {
    num = (num + nums[i]) % k;
    let prev = map.get(num);
    if (prev !== undefined) {
      if (i - prev >= 2) return true;
    } else map.set(num, i);
  }
  return false;
}
console.log(checkSubarraySum([1, 2, 3], 5));
var checkSubarraySum2 = function (nums, k) {
  const m = nums.length;
  if (m < 2) {
    return false;
  }
  const map = new Map();
  map.set(0, -1);
  let remainder = 0;
  for (let i = 0; i < m; i++) {
    remainder = (remainder + nums[i]) % k;
    if (map.has(remainder)) {
      const prevIndex = map.get(remainder);
      if (i - prevIndex >= 2) {
        return true;
      }
    } else {
      map.set(remainder, i);
    }
  }
  return false;
};
console.log(checkSubarraySum2([1, 2, 3], 5));

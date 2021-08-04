import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */
function triangleNumber(nums: number[]): number {
  nums.sort((a, b) => a - b);
  nums.push(Infinity);
  const n = nums.length;
  let ans = 0;
  for (let l1 = 0; l1 < n; l1++) {
    const n1 = nums[l1];
    for (let l2 = l1 + 1; l2 < n - 1; l2++) {
      const n2 = nums[l2];
      const l3 = bs(l2 + 1, n - 1, n1, n2);
      console.log(l1, l2, l3);
      if (l3 !== l2) ans += l3 - l2;
    }
  }
  return ans;
  function bs(left: number, right: number, n1: number, n2: number): number {
    while (left < right) {
      const mid = (left + right) >> 1;
      if (nums[mid] + n1 > n2 && nums[mid] + n2 > n1 && n1 + n2 > nums[mid]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left - 1;
  }
}
console.log(triangleNumber([2, 2, 3, 4]));

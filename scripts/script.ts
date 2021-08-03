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
// function findUnsortedSubarray(nums: number[]): number {
//   let l = -1;
//   let maxl = -Infinity;
//   let r = -1;
//   let maxr = Infinity;
//   const n = nums.length;
//   for (let i = 0; i < n; i++) {
//     if (maxr > nums[i]) r = i;
//     else maxr = nums[i];
//     if (maxl < nums[n - 1 - i]) l = n - 1 - i;
//     else maxl = nums[n - 1 - i];
//   }
//   return r === -1 ? 0 : r - l + 1;
// }
// console.log(findUnsortedSubarray([1, 3, 2, 2, 3]));
// console.log(findUnsortedSubarray([1, 2, 3, 3, 3]));

function findUnsortedSubarray(nums: number[]): number {
  const sorted = nums.slice().sort((a, b) => a - b);
  console.log(nums, sorted);
  let l = -1;
  let r = -1;
  for (let i = 0, n = nums.length; i < n; i++) {
    if (sorted[i] !== nums[i] && l === -1) {
      l = i;
      console.log(1, l);
    }
    if (sorted[n - 1 - i] !== nums[n - 1 - i] && r === -1) {
      r = n - 1 - i;
    }
    if (l !== -1 && r !== -1) break;
  }
  console.log(l, r);
  return r === -1 ? 0 : r - l + 1;
}
console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));

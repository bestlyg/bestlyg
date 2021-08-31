import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function corpFlightBookings(bookings: number[][], n: number): number[] {
  const nums = new Array(n).fill(0);
  for (const [first, last, seats] of bookings) {
    nums[first - 1] += seats;
    if (last < n) nums[last] -= seats;
  }
  for (let i = 1; i < n; i++) nums[i] += nums[i - 1];
  return nums;
}
console.log(
  corpFlightBookings(
    [
      [1, 2, 10],
      [2, 3, 20],
      // [2, 5, 25],
    ],
    5
  )
);

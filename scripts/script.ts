import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
// function trap(height: number[]): number {
//   const len = height.length;
//   const left = new Array(len).fill(0);
//   const right = new Array(len).fill(0);
//   const stack: number[] = [];
//   for (let i = 0; i < len; i++) {
//     const h = height[i];
//     while (stack.length && height[stack[stack.length - 1]] < h) right[stack.pop()!] = i;
//     if (stack.length) left[i] = stack[stack.length - 1];
//     stack.push(i);
//   }
//   console.log(left, right);
//   let ans = 0;
//   for (let i = 0; i < len; i++) {
//     console.log(i, Math.min(height[right[i]], height[left[i]]) - height[i]);
//     ans += Math.max(0, Math.min(height[right[i]], height[left[i]]) - height[i]);
//   }
//   return ans;
// }
// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
function maxSumMinProduct(nums: number[]): number {
  const n = nums.length;
  const l = new Array(n).fill(-1);
  const r = new Array(n).fill(n);
  const stack: number[] = [];
  const sums: number[] = [0];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    sums.push((sum += num));
    while (stack.length && nums[stack[stack.length - 1]] >= num) r[stack.pop()!] = i;
    if (stack.length) l[i] = stack[stack.length - 1];
    stack.push(i);
  }
  let ans = 0n;
  for (let i = 0; i < n; i++) {
    const num = (BigInt(sums[r[i]]) - BigInt(sums[l[i] + 1])) * BigInt(nums[i]);
    ans = ans > num ? ans : num;
  }
  ans %= BigInt(10 ** 9 + 7);
  return Number(ans);
}
console.log(maxSumMinProduct([1, 2, 3, 2]));

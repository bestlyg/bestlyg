import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function combinationSum4(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      console.log(''.padEnd(30, '= '));
      console.log(i, num);
      if (i < num) break;
      dp[i] += dp[i - num];
      console.log(dp);
    }
  }
  return dp[target];
}
console.log(combinationSum4([1, 2, 3], 4));
console.log(combinationSum4([9], 3));

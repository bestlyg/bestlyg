import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function findNumberOfLIS(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(0).map(_ => ({ val: 1, cnt: 1 }));
  let maxVal = 1;
  let maxCnt = 0;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    for (let j = 0; j < i; j++) {
      if (nums[j] < num) {
        const len = dp[j].val + 1;
        if (dp[i].val < len) {
          dp[i].val = len;
          dp[i].cnt = dp[j].cnt;
        } else if (dp[i].val === len) dp[i].cnt += dp[j].cnt;
      }
    }
    if (maxVal < dp[i].val) {
      maxVal = Math.max(maxVal, dp[i].val);
      maxCnt = dp[i].cnt;
    } else if (maxVal === dp[i].val) maxCnt += dp[i].cnt;
  }
  return maxCnt;
}

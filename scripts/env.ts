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
function numSquares(n: number): number {
  let MAX = 1;
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    while (MAX ** 2 <= i) MAX++;
    for (let j = MAX - 1; j >= 1; j--) {
      const num = j ** 2;
      if (num > i) continue;
      const count = ~~(i / num);
      dp[i] = Math.min(dp[i], dp[i - num * count] + count);
    }
  }
  return dp[n];
}
console.log(numSquares(13));

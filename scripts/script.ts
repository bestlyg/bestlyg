import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
  3
2  4
1  n   
 */
function longestPalindromeSubseq(s: string): number {
  const n = s.length;
  if (n === 1) return 1;
  const dp = new Array(n).fill(0).map(_ => new Array(n).fill(0));
  for (let i = n - 2; i >= 0; i--) {
    dp[i][i] = 1;
    const cl = s[i];
    for (let j = i + 1; j < n; j++) {
      const cr = s[j];
      if (cl === cr) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
}

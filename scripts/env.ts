import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function strangePrinter(s: string): number {
  const len = s.length;
  const dp: number[][] = new Array(len).fill(0).map(_ => new Array(len).fill(0));
  for (let i = len - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < len; j++) {
      if (s[i] === s[j]) dp[i][j] = dp[i][j - 1];
      else {
        let min = Infinity;
        for (let k = i; k < j; k++) min = Math.min(dp[i][k] + dp[k + 1][j], min);
        dp[i][j] = min;
      }
    }
  }
  return dp[0][len - 1];
}
console.log(strangePrinter('aaabbb'));
console.log(strangePrinter('aba'));

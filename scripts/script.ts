import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function countArrangement(n: number): number {
  let ans = 0;
  dfs();
  return ans;
  function dfs(list: number[] = [], mask = 0) {
    if (list.length === n) {
      ans++;
      return;
    }
    for (let i = 1; i <= n; i++) {
      if (
        (mask & (1 << (i - 1))) === 0 &&
        (i % (list.length + 1) === 0 || (list.length + 1) % i === 0)
      ) {
        mask |= 1 << (i - 1);
        list.push(i);
        dfs(list, mask);
        list.pop();
        mask &= ~(1 << (i - 1));
      }
    }
  }
}
console.log(countArrangement(3));
const list = [0, 1, 2, 3, 8, 10, 36, 41, 132, 250, 700, 750, 4010, 4237, 10680, 24679];
// for (let i = 1; i <= 15; i++) console.log(countArrangement(i));

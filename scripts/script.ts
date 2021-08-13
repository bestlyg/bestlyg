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
  
 */
function countDigitOne(n: number): number {
  let num = 1;
  let ans = 0;
  while (n >= num) {
    ans += ~~(n / 10 / num) * num + Math.min(Math.max((n % (num * 10)) - num + 1, 0), num);
    num *= 10;
  }
  return ans;
}

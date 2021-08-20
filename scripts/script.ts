import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function reverseStr(s: string, k: number): string {
  const arr = s.split('');
  for (let i = 0, n = s.length; i < n; i += 2 * k) reverse(i, Math.min(i + k - 1, n - 1));
  return arr.join('');
  function reverse(start: number, end: number) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end--], arr[start++]];
    }
  }
}
console.log(reverseStr('abcdefg', 2));

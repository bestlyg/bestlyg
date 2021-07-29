import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */
function reverseBits(n: number): number {
  let ans = 0;
  for (let i = 0, j = 1, k = 2 ** 31; i < 32; i++, j *= 2, k >>>= 1) {
    if (n & j) ans = k;
  }
  return ans;
}
console.log(reverseBits(0b00000010100101000001111010011100));

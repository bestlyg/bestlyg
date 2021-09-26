import { structures, log } from './utils';
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
function getSum(a: number, b: number): number {
  log({ a: a.toString(2), b: b.toString(2) });
  while (b != 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
    log({ a: a.toString(2), b: b.toString(2) });
  }
  return a + b;
}
console.log(getSum(12, 24));

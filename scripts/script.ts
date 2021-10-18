import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, map, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap, Trie } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function findComplement(num: number): number {
  let bit = 0;
  for (; bit <= 30; bit++) {
    if (num < 1 << bit) break;
  }
  if (bit === 31) bit = 0x7fffffff;
  bit = (1 << bit) - 1;
  log({ bit, bit2: bit.toString(2) });
  return bit ^ num;
}
log([findComplement(5)]);

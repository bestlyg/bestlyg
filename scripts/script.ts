import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, repeat, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

const map = new TreeMap<number, number>((t1, t2) => t1 - t2);
[1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 7, 7, 7].forEach(v => {
  map.set(v, v);
});
[4, 5, 3, 6, 2, 7, 1].forEach(v => {
  console.log(repeat('=', 10));
  map.remove(v);
});

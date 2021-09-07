import { structures } from './utils';
import { RBTree2 } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

const tree = new RBTree2<number>((t1, t2) => t1 - t2);
[50, 24, 80, 12, 30, 32].forEach(v => {
  // console.log(`=======================【add:${v}】`);
  tree.add(v);
  // console.log(tree.print());
});
console.log(tree.print());
[80].forEach(v => {
  console.log(`=======================【rm:${v}】`);
  tree.remove(v);
  console.log(tree.print());
});
class A {}
console.log(A.name);

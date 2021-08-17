import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function checkRecord(s: string): boolean {
  let ac = 0;
  let lc = 0;
  for (const c of s) {
    if (c === 'A') {
      if (++ac >= 2) return false;
      lc = 0;
    } else if (c === 'L') {
      if (++lc > 3) return false;
    } else {
      lc = 0;
    }
  }
  return true;
}
console.log(checkRecord('LALL'));

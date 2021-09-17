import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function checkValidString(s: string): boolean {
  let min = 0;
  let max = 0;
  for (const c of s) {
    if (c === '(') {
      min++;
      max++;
    } else if (c === ')') {
      min = Math.max(min - 1, 0);
      max--;
      if (max < 0) return false;
    } else {
      min = Math.max(min - 1, 0);
      max++;
    }
  }
  return min === 0;
}

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
function countSegments(s: string): number {
  let ans = 0;
  let f = false;
  for (const c of s) {
    if (c === ' ') {
      if (f) {
        ans++;
        f = false;
      }
      f = false;
    } else {
      f = true;
    }
  }
  if (f) ans++;
  return ans;
}
log([countSegments('Hello, my name is John')]);

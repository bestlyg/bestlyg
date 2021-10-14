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
function peakIndexInMountainArray(arr: number[]): number {
  return find(0, arr.length - 1);
  function find(l: number, r: number): number {
    log({ l, r, mid: (l + r) >> 1 });
    if (l >= r) return l;
    const lnum = arr[l];
    const rnum = arr[r];
    // if (l - r === 1) return lnum > rnum ? l : r;
    const mid = (l + r) >> 1;
    const midnum = arr[mid];
    if (midnum > lnum && midnum > rnum) {
      const i1 = find(l, mid);
      const i2 = find(mid, r);
      return arr[i1] > arr[i2] ? i1 : i2;
    } else if (midnum <= rnum) {
      return find(mid + 1, r);
    } else {
      return find(l, mid - 1);
    }
  }
}
log([
  // peakIndexInMountainArray([0, 1, 0]),
  // peakIndexInMountainArray([1, 3, 5, 4, 2]),
  // peakIndexInMountainArray([0, 10, 5, 2]),
  // peakIndexInMountainArray([3, 4, 5, 1]),
  // peakIndexInMountainArray([24, 69, 100, 99, 79, 78, 67, 36, 26, 19]),
  peakIndexInMountainArray([3, 5, 3, 2, 0]),
]);

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
1*
 */
function computeArea(
  ax1: number,
  ay1: number,
  ax2: number,
  ay2: number,
  bx1: number,
  by1: number,
  bx2: number,
  by2: number
): number {
  if (bx1 < ax1)
    [ax1, ay1, ax2, ay2, bx1, by1, bx2, by2] = [bx1, by1, bx2, by2, ax1, ay1, ax2, ay2];
  const comp = (x1: number, y1: number, x2: number, y2: number) => (x2 - x1) * (y2 - y1);
  const areaA = comp(ax1, ay1, ax2, ay2);
  const areaB = comp(bx1, by1, bx2, by2);
  if (bx1 > ax2 || by1 > ay2 || by2 < ay1) return areaA + areaB;
  const areaC = comp(
    Math.max(ax1, bx1),
    Math.max(ay1, by1),
    Math.min(ax2, bx2),
    Math.min(ay2, by2)
  );
  return areaA + areaB - areaC;
}
log({
  ans: computeArea(-3, 0, 3, 4, 0, -1, 9, 2),
  ans2: computeArea(-2, -2, 2, 2, -2, -2, 2, 2),
  ans3: computeArea(-2, -2, 2, 2, -1, -1, 1, 1),
});

import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */

function maxPoints(points: number[][]): number {
  const len = points.length;
  if (len === 1) return 1;
  const cacheKB: Record<string, Set<number>> = {};
  const cacheX: Record<string, Set<number>> = {};
  for (let i1 = 0; i1 < len; i1++) {
    const [x1, y1] = points[i1];
    for (let i2 = i1 + 1; i2 < len; i2++) {
      const [x2, y2] = points[i2];
      if (x1 === x2) {
        let set = cacheX[x1];
        if (!set) set = cacheX[x1] = new Set();
        set.add(i1);
        set.add(i2);
      } else {
        const k = (y1 - y2) / (x1 - x2);
        const b = y1 - k * x1;
        const str = `k=${k},b=${b}`;
        let set = cacheKB[str];
        if (!set) set = cacheKB[str] = new Set();
        set.add(i1);
        set.add(i2);
      }
    }
  }
  return Math.max(
    ...Object.values(cacheKB).map(v => v.size),
    ...Object.values(cacheX).map(v => v.size)
  );
}
console.log(
  maxPoints([
    [1, 1],
    [3, 2],
    [5, 3],
    [4, 1],
    [2, 3],
    [1, 4],
  ])
);

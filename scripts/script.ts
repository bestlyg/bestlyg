import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function numberOfBoomerangs(points: number[][]): number {
  const n = points.length;
  const getDistance = ([x1, y1]: number[], [x2, y2]: number[]) => (x1 - x2) ** 2 + (y1 - y2) ** 2;
  const pointMap: Map<number[], Map<number, number>> = new Map();
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    let map1 = pointMap.get(p1);
    if (!map1) pointMap.set(p1, (map1 = new Map()));
    for (let j = i + 1; j < n; j++) {
      const p2 = points[j];
      let map2 = pointMap.get(p2);
      if (!map2) pointMap.set(p2, (map2 = new Map()));
      const distance = getDistance(p1, p2);
      const count1 = map1.get(distance) ?? 0;
      map1.set(distance, count1 + 1);
      ans += count1 * 2;
      const count2 = map2.get(distance) ?? 0;
      map2.set(distance, count2 + 1);
      ans += count2 * 2;
    }
  }
  return ans;
}
console.log(
  numberOfBoomerangs([
    [0, 0],
    [1, 0],
    [2, 0],
  ])
);

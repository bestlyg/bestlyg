import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, repeat, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

type Data = {
  cost: number;
  profit: number;
};
function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
  const n = profits.length;
  const list: Data[] = [];
  for (let i = 0; i < n; i++)
    list.push({
      cost: capital[i],
      profit: profits[i],
    });
  list.sort((a, b) => a.cost - b.cost);
  const heap = new Heap<Data>((t1, t2) => t1.profit - t2.profit);
  if (w >= list[list.length - 1].cost) {
    return list
      .sort((a, b) => b.profit - a.profit)
      .slice(0, k)
      .reduce((total, cur) => (total += cur.profit), w);
  }
  let idx = 0;
  while (k > 0) {
    while (idx < n && list[idx].cost <= w) {
      heap.add(list[idx++]);
    }
    if (heap.size === 0) break;
    const data = heap.remove();
    w += data.profit;
    k--;
  }
  return w;
}
console.log(findMaximizedCapital(1, 2, [1, 2, 3], [1, 1, 2]));

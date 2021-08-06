import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 0000
 1
 */
function shortestPathLength(graph: number[][]): number {
  const n = graph.length;
  const queue: [number, number, number][] = [];
  const seen = new Array(n).fill(0).map(_ => new Set<number>());
  for (let i = 0; i < n; i++) {
    queue.push([i, 1 << i, 0]);
    seen[i].add(1 << i);
  }
  let ans = Infinity;
  while (queue.length) {
    const data = queue.shift()!;
    const [idx, mask, step] = data;
    if (mask === (1 << n) - 1) {
      ans = step;
      break;
    }
    for (const next of graph[idx]) {
      const newMask = mask | (1 << next);
      if (seen[next].has(newMask)) continue;
      queue.push([next, newMask, step + 1]);
      seen[next].add(newMask);
    }
  }
  return ans;
}
console.log(shortestPathLength([[1], [0, 2, 4], [1, 3], [2], [1, 5], [4]]));

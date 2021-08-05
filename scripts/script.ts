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
 
 
 */

function eventualSafeNodes(graph: number[][]): number[] {
  const n = graph.length;
  const ans = new Map<number, boolean>();
  const set = new Set<number>();
  for (let i = 0; i < n; i++) dfs(i);
  function dfs(idx: number) {
    if (set.has(idx)) return false;
    if (ans.has(idx)) return ans.get(idx);
    if (graph[idx].length === 0) {
      ans.set(idx, true);
      return true;
    }
    set.add(idx);
    let f = true;
    for (const next of graph[idx]) {
      if (!dfs(next)) {
        f = false;
        break;
      }
    }
    set.delete(idx);
    ans.set(idx, f);
    return f;
  }
  return [...ans.entries()]
    .filter(([, f]) => f)
    .map(([val]) => val)
    .sort((a, b) => a - b);
}
console.log(eventualSafeNodes([[1, 2], [2, 3], [5], [0], [5], [], []]));

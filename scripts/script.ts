import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function allPathsSourceTarget(graph: number[][]): number[][] {
  const n = graph.length;
  const ans: number[][] = [];
  dfs(0);
  return ans;
  function dfs(node: number, list: number[] = []) {
    list.push(node);
    if (node === n - 1) ans.push(list.slice());
    graph[node].forEach(v => dfs(v, list));
    list.pop();
  }
}

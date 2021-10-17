import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, map, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap, Trie } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function kthSmallest(root: TreeNode | null, k: number): number {
  let ans!: number;
  dfs(root);
  return ans;
  function dfs(node: TreeNode | null): void {
    if (node === null) return;
    dfs(node.left);
    if (--k === 0) {
      ans = node.val;
      return;
    }
    dfs(node.right);
  }
}
log([kthSmallest(TreeNode.factory([3, 1, 4, null, 2]), 3)]);

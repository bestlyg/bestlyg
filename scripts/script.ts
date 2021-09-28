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
function pathSum(root: TreeNode | null, targetSum: number): number {
  if (root === null) return 0;
  let ans = 0;
  dfs(root);
  return ans;
  function dfs(node: TreeNode | null, list: number[] = []) {
    if (node === null) return;
    const val = node.val;
    const len = list.length;
    if (val === targetSum) ans++;
    for (let i = 0; i < len; i++) if ((list[i] += val) === targetSum) ans++;
    list.push(val);
    dfs(node.left, list);
    dfs(node.right, list);
    list.pop();
    for (let i = 0; i < len; i++) list[i] -= val;
  }
}

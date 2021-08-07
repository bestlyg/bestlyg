import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
  3
2  4
1  n   
 */
function BSTSequences(root: TreeNode | null): number[][] {
  if (root === null) return [[]];
  if (root.left === null && root.right === null) return [[root.val]];
  if (root.left !== null && root.right === null) {
    const sub = BSTSequences(root.left);
    return sub.map(v => [root.val, ...v]);
  }
  if (root.right !== null && root.left === null) {
    const sub = BSTSequences(root.right);
    return sub.map(v => [root.val, ...v]);
  }
  const subl = BSTSequences(root.left);
  const subr = BSTSequences(root.right);
  const ans: number[][] = [];
  for (const l of subl) {
    for (const r of subr) {
      merge(l, 0, r, 0, [], root.val);
    }
  }
  return ans;
  function merge(
    l: number[],
    idxl: number,
    r: number[],
    idxr: number,
    list: number[],
    root: number
  ): void {
    if (l.length === idxl) {
      for (let i = idxr; i < r.length; i++) list.push(r[i]);
      list.unshift(root);
      ans.push(list);
      return;
    }
    if (r.length === idxr) {
      for (let i = idxl; i < l.length; i++) list.push(l[i]);
      list.unshift(root);
      ans.push(list);
      return;
    }
    merge(l, idxl + 1, r, idxr, [...list, l[idxl]], root);
    merge(l, idxl, r, idxr + 1, [...list, r[idxr]], root);
  }
}
console.log(BSTSequences(TreeNode.factory([5, 2, null, 1, 4, null, null, 3])));

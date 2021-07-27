import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */

function findSecondMinimumValue(root: TreeNode | null): number {
  return find();
  function find(node: TreeNode | null = root, val = root!.val): number {
    if (node === null) return -1;
    if (node.val > val) return node.val;
    const l = find(node.left, val);
    const r = find(node.right, val);
    return l > val && r > val ? Math.min(l, r) : Math.max(l, r);
  }
}

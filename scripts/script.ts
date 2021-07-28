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
function distanceK(root: TreeNode | null, target: TreeNode | null, k: number): number[] {
  const ans: number[] = [];
  find(root);
  return ans;
  function find(node: TreeNode | null): number {
    console.log('===');
    console.log(node);
    if (node === null) return -1;
    if (node === target) {
      dfs(node, k);
      return k - 1;
    }
    let distance = find(node.left);
    if (distance !== -1) {
      if (distance === 0) ans.push(node.val);
      else {
        dfs(node.right, distance - 1);
        return distance - 1;
      }
      return -1;
    }
    distance = find(node.right);
    if (distance !== -1) {
      if (distance === 0) ans.push(node.val);
      else {
        dfs(node.left, distance - 1);
        return distance - 1;
      }
    }
    return -1;
  }
  function dfs(node: TreeNode | null, k: number): void {
    console.log('dfs', node, k);
    if (node === null) return;
    if (k === 0) {
      ans.push(node.val);
    } else {
      dfs(node.left, k - 1);
      dfs(node.right, k - 1);
    }
  }
}
const root = TreeNode.factory([0, 1, null, 3, 2]);
const target = root?.left?.right!;
console.log(distanceK(root, target, 1));

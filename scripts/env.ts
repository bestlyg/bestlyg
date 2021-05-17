import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  if (root === null) return false;
  const findGrandParent = (
    val: number,
    queue: TreeNode[],
    node: TreeNode | null = root
  ): boolean => {
    if (node === null) return false;
    queue.unshift(node);
    if (node.val === val) return true;
    if (findGrandParent(val, queue, node.left)) return true;
    if (findGrandParent(val, queue, node.right)) return true;
    queue.shift();
    return false;
  };
  const queueX: TreeNode[] = [];
  findGrandParent(x, queueX);
  const queueY: TreeNode[] = [];
  findGrandParent(y, queueY);
  if (queueX.length < 3 || queueY.length < 3) return false;
  return queueX[1] !== queueY[1] && queueX.length === queueY.length;
}
console.log(isCousins(TreeNode.factory([1, 2, 3, null, null, 4, 5]), 4, 5));
// [1,2,3,null,null,4,5]
// 4
// 5

import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
function deepestLeavesSum(root: TreeNode | null): number {
  if (root === null) return 0;
  let maxDep = 1;
  let ans = root.val;
  const inorder = (node: TreeNode, dep = 1): void => {
    if (dep > maxDep) {
      ans = 0;
      maxDep = dep;
    }
    node.left && inorder(node.left, dep + 1);
    node.right && inorder(node.right, dep + 1);
    if (!node.left && !node.right) ans += node.val;
  };
  return ans;
}
console.log(
  deepestLeavesSum(TreeNode.factory([1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8]))
);

import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const _preorder = (node: TreeNode | null, list: number[]) => {
    if (node === null) return;
    node.left === null && node.right === null && list.push(node.val);
    _preorder(node.left, list);
    _preorder(node.right, list);
  };
  const preorder = (root: TreeNode | null): string => {
    const ans: number[] = [];
    _preorder(root, ans);
    return ans.join(',');
  };
  return preorder(root1) === preorder(root2);
}
// [3,5,1,6,2,9,8,null,null,7,14]
// [3,5,1,6,71,4,2,null,null,null,null,null,null,9,8]
console.log(
  leafSimilar(
    TreeNode.factory([3, 5, 1, 6, 2, 9, 8, null, null, 7, 14]),
    TreeNode.factory([3, 5, 1, 6, 71, 4, 2, null, null, null, null, null, null, 9, 8])
  )
);

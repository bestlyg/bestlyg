import { structures } from './utils';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
function increasingBST(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;
  const queue: TreeNode[] = [];
  inorder(root);
  for (let i = 0, l = queue.length - 1; i < l; i++) {
    const node = queue[i];
    node.left = null;
    node.right = queue[i + 1];
  }
  const last = queue[queue.length - 1];
  last.right = last.left = null;
  return queue[0];
  function inorder(node: TreeNode | null): void {
    if (node === null) return;
    inorder(node.left);
    queue.push(node);
    inorder(node.right);
  }
}

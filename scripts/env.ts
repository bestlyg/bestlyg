import { structures } from './utils';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  let sum = 0;
  const sumNode = (node: TreeNode | null): void => {
    if (node === null) return;
    const val = node.val;
    if (val < low) sumNode(node.right);
    else if (val > high) sumNode(node.left);
    else {
      sum += val;
      sumNode(node.right);
      sumNode(node.left);
    }
  };
  sumNode(root);
  return sum;
}

import { TreeNode } from 'scripts/utils/structures';

function minDiffInBST(root: TreeNode | null): number {
  if (root === null) return 0;
  const arr: number[] = [];
  const inorder = (node: TreeNode | null) => {
    if (node === null) return;
    inorder(node.left);
    arr.push(node.val);
    inorder(node.right);
  };
  inorder(root);
  let min = Infinity;
  for (let i = 1, l = arr.length; i < l; i++) {
    min = Math.min(min, arr[i] - arr[i - 1]);
  }
  return min;
}

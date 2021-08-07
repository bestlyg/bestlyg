var inorderSuccessor = function (root, p) {
  let pre;
  return inorder(root, p);
  function inorder(node, p) {
    if (node === null) return null;
    let ans;
    ans = inorder(node.left, p);
    if (ans) return ans;
    if (pre === p) return node;
    pre = node;
    ans = inorder(node.right, p);
    if (ans) return ans;
    return null;
  }
};

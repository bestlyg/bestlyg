const fs = require('fs-extra');
const path = require('path');
const data = fs
  .readFileSync(path.resolve(__dirname, '../../temp', '【第五周】二叉树与经典问题-彩蛋数据.txt'))
  .toString()
  .split('\n');
const front = data[1].split(' ').map(v => +v);
const mid = data[3].split(' ').map(v => +v);
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
const buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null;
  const nodeVal = preorder[0];
  const leftLen = inorder.indexOf(nodeVal);
  return new TreeNode(
    nodeVal,
    buildTree(preorder.slice(1, 1 + leftLen), inorder.slice(0, leftLen)),
    buildTree(preorder.slice(1 + leftLen), inorder.slice(leftLen + 1))
  );
};
const root = buildTree(front, mid);
let ans = 0;
let c = 1;
function postOrder(node) {
  if (node === null) return;
  postOrder(node.left);
  postOrder(node.right);
  ans += node.val * c++;
}
postOrder(root);
console.log(ans);
const inorderData = [];
function inorder(node) {
  if (node === null) return;
  inorder(node.left);
  inorderData.push(node.val);
  inorder(node.right);
}
inorder(root);
console.log(inorderData);

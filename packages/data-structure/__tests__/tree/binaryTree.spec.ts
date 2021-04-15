import { BinaryTreeNode, inorder, preorder, postorder, levelOrder } from '../../src';
describe('BinaryTree', () => {
  test('inorder', () => {
    const tree = new BinaryTreeNode(0);
    tree.left = new BinaryTreeNode(1);
    tree.right = new BinaryTreeNode(2);
    expect(inorder(tree, []).join('')).toBe('102');
    expect(inorder(null, []).join('')).toBe('');
  });
  test('preorder', () => {
    const tree = new BinaryTreeNode(0);
    tree.left = new BinaryTreeNode(1);
    tree.right = new BinaryTreeNode(2);
    expect(preorder(tree, []).join('')).toBe('012');
    expect(preorder(null, []).join('')).toBe('');
  });
  test('postorder', () => {
    const tree = new BinaryTreeNode(0);
    tree.left = new BinaryTreeNode(1);
    tree.right = new BinaryTreeNode(2);
    expect(postorder(tree, []).join('')).toBe('120');
    expect(postorder(null, []).join('')).toBe('');
  });
  test('levelOrder', () => {
    const tree = new BinaryTreeNode(0);
    tree.left = new BinaryTreeNode(1);
    tree.right = new BinaryTreeNode(2);
    expect(levelOrder(tree, []).join('')).toBe('012');
    expect(levelOrder(null, []).join('')).toBe('');
  });
});

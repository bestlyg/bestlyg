import { BinaryTreeNode } from '../../src';
describe('BinaryTree', () => {
  test('inorder', () => {
    const tree = BinaryTreeNode.create([1, 2, 3]);
    let str = '';
    tree.inorder(node => {
      str += node.val;
      return false;
    });
    expect(str).toBe('213');
  });
});

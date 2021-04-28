import { BinarySearchTree } from '../../src';
describe('BinaryTree', () => {
  let tree!: BinarySearchTree<number>;
  beforeEach(() => {
    tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
    tree.add(1);
    tree.add(0);
    tree.add(2);
  });
  test('inorder', () => {
    expect(tree.inorder().join('')).toBe('012');
  });
  test('preorder', () => {
    expect(tree.preorder().join('')).toBe('102');
  });
  test('postorder', () => {
    expect(tree.postorder().join('')).toBe('021');
  });
  test('levelOrder', () => {
    expect(tree.levelOrder().join('')).toBe('102');
  });
});

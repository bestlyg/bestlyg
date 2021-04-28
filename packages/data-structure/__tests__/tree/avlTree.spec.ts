import { AVLTree } from '../../src';
describe('AVLTree', () => {
  let tree: AVLTree<number>;
  beforeEach(() => {
    tree = new AVLTree<number>((t1, t2) => t1 - t2);
  });
  describe('add', () => {
    test('LL', () => {
      tree.add(3);
      tree.add(2);
      tree.add(1);
      expect(tree.levelOrder().join('')).toBe('213');
    });
    test('LR', () => {
      tree.add(4);
      tree.add(2);
      tree.add(3);
      expect(tree.levelOrder().join('')).toBe('324');
    });

    test('RR', () => {
      tree.add(0);
      tree.add(1);
      tree.add(2);
      expect(tree.levelOrder().join('')).toBe('102');
    });
    test('RL', () => {
      tree.add(0);
      tree.add(3);
      tree.add(2);
      expect(tree.levelOrder().join('')).toBe('203');
    });
  });
  test('remove', () => {
    tree.add(1);
    tree.add(2);
    tree.add(3);
    tree.add(4);
    tree.add(5);
    tree.remove(1);
    expect(tree.levelOrder().join('')).toBe('4253');
  });
});

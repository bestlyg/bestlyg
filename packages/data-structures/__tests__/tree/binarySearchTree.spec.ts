import { BinarySearchTree } from '../../src';

class DummyNumber {
  constructor(public val: number, public dummyVal: number) {}
}
describe('BinarySearchTree', () => {
  describe('add', () => {
    test('add new val', () => {
      const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
      tree.add(5);
      tree.add(3);
      tree.add(4);
      tree.add(1);
      tree.add(2);
      tree.add(8);
      tree.add(7);
      tree.add(6);
      expect(tree.inorder().join('')).toBe('12345678');
    });
    test('add old val', () => {
      const tree = new BinarySearchTree<DummyNumber>((t1, t2) => t1.val - t2.val);
      const oldNum = new DummyNumber(1, 1);
      const newNum = new DummyNumber(1, 2);
      tree.add(oldNum);
      tree.add(newNum);
      expect(
        tree
          .inorder()
          .map(v => v.dummyVal)
          .join('')
      ).toBe('2');
    });
  });
  test('clear', () => {
    const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
    tree.add(5);
    tree.add(3);
    tree.clear();
    expect(tree.empty).toBeTruthy();
  });
  describe('contains', () => {
    test('contains', () => {
      const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
      tree.add(5);
      tree.add(3);
      tree.add(4);
      tree.add(1);
      tree.add(2);
      tree.add(8);
      tree.add(7);
      tree.add(6);
      expect(tree.contains(1)).toBeTruthy();
      expect(tree.contains(2)).toBeTruthy();
      expect(tree.contains(3)).toBeTruthy();
      expect(tree.contains(4)).toBeTruthy();
      expect(tree.contains(5)).toBeTruthy();
      expect(tree.contains(6)).toBeTruthy();
      expect(tree.contains(7)).toBeTruthy();
      expect(tree.contains(8)).toBeTruthy();
      expect(tree.contains(9)).toBeFalsy();
      expect(tree.contains(10)).toBeFalsy();
    });
    test('empty', () => {
      const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
      expect(tree.contains(2)).toBeFalsy();
    });
  });
  describe('remove', () => {
    describe('root', () => {
      test('has 2 degree', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(3);
        tree.add(4);
        tree.add(1);
        tree.add(2);
        tree.add(8);
        tree.add(7);
        tree.add(6);
        tree.remove(5);
        expect(tree.inorder().join('')).toBe('1234678');
      });
      test('has 1 degree is predecessor', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(3);
        tree.add(4);
        tree.add(1);
        tree.add(2);
        tree.remove(5);
        expect(tree.inorder().join('')).toBe('1234');
      });
      test('has 1 degree is successor', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(8);
        tree.add(6);
        tree.add(9);
        tree.add(12);
        tree.remove(5);
        expect(tree.inorder().join('')).toBe('68912');
      });
      test('has 0 degree', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.remove(5);
        expect(tree.empty).toBeTruthy();
      });
    });
    test('remove node has 0 degree', () => {
      const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
      tree.add(5);
      tree.add(1);
      tree.add(2);
      tree.remove(2);
      expect(tree.inorder().join('')).toBe('15');
    });
    describe('0 degree', () => {
      test('node==parent.right', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(1);
        tree.add(2);
        tree.remove(2);
        expect(tree.size).toBe(2);
      });
      test('node==parent.left', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(2);
        tree.add(1);
        tree.remove(1);
        expect(tree.size).toBe(2);
      });
    });
    describe('1 degree', () => {
      test('node==parent.left && node.right!=null', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(1);
        tree.add(2);
        tree.remove(1);
        expect(tree.inorder().join('')).toBe('25');
      });
      test('node==parent.left && node.left!=null', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(2);
        tree.add(1);
        tree.remove(2);
        expect(tree.inorder().join('')).toBe('15');
      });
      test('node==parent.right && node.right!=null', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(6);
        tree.add(7);
        tree.remove(6);
        expect(tree.inorder().join('')).toBe('57');
      });
      test('node==parent.right && node.left!=null', () => {
        const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
        tree.add(5);
        tree.add(7);
        tree.add(6);
        tree.remove(7);
        expect(tree.inorder().join('')).toBe('56');
      });
    });
    test('empty', () => {
      const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
      tree.remove(1);
      expect(tree.empty).toBeTruthy();
    });
    test('not fount val', () => {
      const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
      tree.add(1);
      tree.remove(2);
      expect(tree.size).toBe(1);
    });
  });
});

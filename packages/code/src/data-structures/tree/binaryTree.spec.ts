import { AVLTree } from './avlTree';
import { BinarySearchTree } from './binarySearchTree';
import { BinaryTreeNode } from './binaryTree';

describe('BinaryTree', () => {
    let tree!: BinarySearchTree<number>;
    beforeEach(() => {
        tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
    });
    test('sibling', () => {
        const root = new BinaryTreeNode(0);
        root.left = new BinaryTreeNode(1);
        root.right = new BinaryTreeNode(2);
        root.left.parent = root;
        root.right.parent = root;
        expect(root.sibling).toBeNull();
        expect(root.left.sibling).toBe(root.right);
        expect(root.right.sibling).toBe(root.left);
    });
    describe('order', () => {
        test('inorder', () => {
            tree.add(1);
            tree.add(0);
            tree.add(2);
            expect(tree.inorder().join('')).toBe('012');
        });
        test('preorder', () => {
            tree.add(1);
            tree.add(0);
            tree.add(2);
            expect(tree.preorder().join('')).toBe('102');
        });
        test('postorder', () => {
            tree.add(1);
            tree.add(0);
            tree.add(2);
            expect(tree.postorder().join('')).toBe('021');
        });
        test('levelOrder', () => {
            expect(tree.levelOrder().join('')).toBe('');
            tree.add(1);
            tree.add(0);
            tree.add(2);
            expect(tree.levelOrder().join('')).toBe('102');
        });
    });
    test('print', () => {
        expect(tree.print()).toBe('');
        tree = new AVLTree<number>((t1, t2) => t1 - t2);
        [4, 31, 69, 7, 16, 2, 9, 90, 17].forEach(v => tree.add(v));
        const replace = (str: string) => str.replace(/\n/g, '');
        expect(replace(tree.print())).toBe(
            replace(`
7
├ R 31
│  ├── R 69
│  │    └── R 90
│  └── L 16
│       ├── R 17
│       └── L 9
└ L 4
   └── L 2`)
        );
    });
});
describe('BinaryTreeNode', () => {
    describe('successor and predecessor', () => {
        const root = new BinaryTreeNode<number>(0);
        root.left = new BinaryTreeNode<number>(1, root);
        root.left.left = new BinaryTreeNode<number>(3, root.left);
        root.left.right = new BinaryTreeNode<number>(4, root.left);
        root.right = new BinaryTreeNode<number>(5, root);
        root.right.left = new BinaryTreeNode<number>(6, root.right);
        root.right.right = new BinaryTreeNode<number>(7, root.right);
        test('predecessor', () => {
            expect(root.left?.left?.predecessor()?.val).toBeUndefined();
            expect(root.left?.predecessor()?.val).toBe(3);
            expect(root.left?.right?.predecessor()?.val).toBe(1);
            expect(root?.predecessor()?.val).toBe(4);
            expect(root.right?.left?.predecessor()?.val).toBe(0);
            expect(root.right?.predecessor()?.val).toBe(6);
            expect(root.right?.right?.predecessor()?.val).toBe(5);
        });
        test('successor', () => {
            expect(root.left?.left?.successor()?.val).toBe(1);
            expect(root.left?.successor()?.val).toBe(4);
            expect(root.left?.right?.successor()?.val).toBe(0);
            expect(root?.successor()?.val).toBe(6);
            expect(root.right?.left?.successor()?.val).toBe(5);
            expect(root.right?.successor()?.val).toBe(7);
            expect(root.right?.right?.successor()?.val).toBeUndefined();
        });
    });
    describe('remove', () => {
        const root = new BinaryTreeNode<number>(0);
        root.remove();
        expect(root.degree).toBe(0);
    });
});

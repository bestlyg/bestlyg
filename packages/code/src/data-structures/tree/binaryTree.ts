import { Comparator } from '@/shared';
import { repeat } from 'lodash';
/** 节点的度 */
export type BinaryTreeNodeDegree = 0 | 1 | 2;
/** 节点是父节点的左右子树 */
export enum BinaryTreeNodeChildPosition {
    LEFT = 'left',
    RIGHT = 'right',
}
export const reverseBinaryTreeNodeChildPosition = (pos: BinaryTreeNodeChildPosition) =>
    pos === BinaryTreeNodeChildPosition.LEFT
        ? BinaryTreeNodeChildPosition.RIGHT
        : BinaryTreeNodeChildPosition.LEFT;
/** 二叉树节点 */
export class BinaryTreeNode<T> {
    /** 树的度 */
    get degree(): BinaryTreeNodeDegree {
        if (this.left !== null && this.right !== null) return 2;
        else if (this.left !== null || this.right !== null) return 1;
        else return 0;
    }
    /** 是父节点的左子节点 */
    get isLeftChild(): boolean {
        return !!(this.parent?.left === this);
    }
    /** 是父节点的右子节点 */
    get isRightChild(): boolean {
        return !!(this.parent?.right === this);
    }
    get childPosition(): BinaryTreeNodeChildPosition {
        return this.isLeftChild
            ? BinaryTreeNodeChildPosition.LEFT
            : BinaryTreeNodeChildPosition.RIGHT;
    }
    get sibling(): BinaryTreeNode<T> | null {
        return this.parent === null
            ? null
            : this.parent[reverseBinaryTreeNodeChildPosition(this.childPosition)];
    }
    constructor(
        /** 节点储存的值 */
        public val: T,
        /** 父节点 */
        public parent: BinaryTreeNode<T> | null = null,
        /** 左子节点 */
        public left: BinaryTreeNode<T> | null = null,
        /** 右子节点 */
        public right: BinaryTreeNode<T> | null = null
    ) {}
    /** 从父节点移除自己 */
    remove() {
        if (this.parent === null) return;
        this.parent[this.childPosition] = null;
    }
    /** 后驱节点 */
    successor(): BinaryTreeNode<T> | null {
        // 如果没有右节点时找是父节点左节点的祖先节点
        if (this.right === null) {
            let node: BinaryTreeNode<T> | null = this;
            while (node.parent !== null && node.isRightChild) node = node.parent;
            return node.parent;
        }
        let successor = this.right;
        while (successor.left !== null) successor = successor.left;
        return successor;
    }
    /** 前驱节点 */
    predecessor(): BinaryTreeNode<T> | null {
        // 如果没有左节点时找是父节点右节点的祖先节点
        if (this.left === null) {
            let node: BinaryTreeNode<T> | null = this;
            while (node.parent !== null && node.isLeftChild) node = node.parent;
            return node.parent;
        }
        let predecessor = this.left;
        while (predecessor.right !== null) predecessor = predecessor.right;
        return predecessor;
    }
    toString(): string {
        return `${this.val}`;
    }
}
export abstract class BinaryTree<T> {
    protected root: BinaryTreeNode<T> | null = null;
    protected _size = 0;
    get size() {
        return this._size;
    }
    get empty() {
        return this.size === 0;
    }
    constructor(protected compare: Comparator<T>) {}
    protected abstract createNode(
        val: T,
        parent: BinaryTreeNode<T> | null,
        left: BinaryTreeNode<T> | null,
        right: BinaryTreeNode<T> | null
    ): BinaryTreeNode<T>;
    clear() {
        this.root = null;
        this._size = 0;
    }
    /**
     * 前序遍历
     * 先读取val值，再遍历左节点，再遍历右节点
     */
    preorder(): T[] {
        return this._preorder(this.root, []);
    }
    protected _preorder(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
        if (node === null) return queue;
        queue.push(node.val);
        this._preorder(node.left, queue);
        this._preorder(node.right, queue);
        return queue;
    }
    /**
     * 中序遍历
     * 先遍历左节点，再读取val值，再遍历右节点
     */
    inorder(): T[] {
        return this._inorder(this.root, []);
    }
    protected _inorder(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
        if (node === null) return queue;
        this._inorder(node.left, queue);
        queue.push(node.val);
        this._inorder(node.right, queue);
        return queue;
    }
    /**
     * 后序遍历
     * 先遍历左节点，再遍历右节点，再读取val值
     */
    postorder(): T[] {
        return this._postorder(this.root, []);
    }
    protected _postorder(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
        if (node === null) return queue;
        this._postorder(node.left, queue);
        this._postorder(node.right, queue);
        queue.push(node.val);
        return queue;
    }
    /**
     * 层序遍历
     * 按行遍历树
     */
    levelOrder(): T[] {
        const list: T[] = [];
        if (this.root === null) return list;
        const queue: BinaryTreeNode<T>[] = [this.root];
        while (queue.length !== 0) {
            const node = queue.shift()!;
            list.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        return list;
    }
    //├│─└┌
    print(): string {
        return this.root === null ? '' : this._print(this.root);
    }
    private _print(node: BinaryTreeNode<T>, prefix = ''): string {
        const left = node.left;
        const right = node.right;
        const nodeStr = node.toString();
        const halfLength = (nodeStr.length + (prefix === '' ? 0 : 3)) >> 1;
        const blankStr = repeat(' ', halfLength);
        const lineStr = repeat('─', halfLength);
        prefix += blankStr;
        let str = nodeStr + `\n`;
        if (right !== null) {
            str +=
                prefix +
                (left === null ? '└' : '├') +
                lineStr +
                ' R ' +
                this._print(right, `${prefix}${left === null ? ' ' : '│'}${blankStr}`);
        }
        if (left !== null) {
            str += `${prefix}└${lineStr}` + ' L ' + this._print(left, `${prefix}${blankStr} `);
        }
        return str;
    }
}

import { repeat } from 'lodash';
/** 树的度 */
export type BinaryTreeNodeDegree = 0 | 1 | 2;
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
    if (this.parent.left === this) this.parent.left = null;
    else this.parent.right = null;
  }
  /** 后驱节点 */
  successor(): BinaryTreeNode<T> | null {
    // 如果没有右节点时找是父节点左节点的祖先节点
    if (this.right === null) {
      let node: BinaryTreeNode<T> | null = this;
      while (node.parent !== null && node.isRightChild) node = node.parent;
      return node;
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
      return node;
    }
    let predecessor = this.left;
    while (predecessor.right !== null) predecessor = predecessor.right;
    return predecessor;
  }
  toString(): string {
    return `Node(${this.val + ''})_Parent(${this.parent ? this.parent.val : 'null'})`;
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
  constructor(protected compare: (t1: T, t2: T) => number) {}
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
    return this.root === null ? '' : this._print(this.root, '');
  }
  private _print(node: BinaryTreeNode<T>, prefix: string): string {
    const left = node.left;
    const right = node.right;
    const nodeStr = node.toString();
    const halfLength = nodeStr.length >> 1;
    const blankStr = repeat(' ', halfLength);
    const lineStr = repeat('─', halfLength);
    let str = nodeStr + `\n`;
    if (right !== null) {
      str += `${prefix}${blankStr}${left === null ? '└' : '├'}${lineStr} R `;
      str += this._print(right, `${prefix}${blankStr}${left === null ? ' ' : '│'}${blankStr}`);
    }
    if (left !== null) {
      str += `${prefix}${blankStr}└${lineStr} L `;
      str += this._print(left, `${prefix}${blankStr + blankStr + ' '}`);
    }
    return str;
  }
}

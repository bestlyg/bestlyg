import { BlanceBinarySearchTree } from './blanceBinarySearchTree';
import { BinaryTreeNode } from './binaryTree';
export enum Color {
  RED = 'red',
  BLACK = 'black',
}
const getColor = (node: RBTreeNode<any> | null) => (node === null ? Color.BLACK : node.color);
const isRed = (node: RBTreeNode<any> | null) => getColor(node) === Color.RED;
const isBlack = (node: RBTreeNode<any> | null) => getColor(node) === Color.BLACK;
export class RBTreeNode<T> extends BinaryTreeNode<T> {
  private _color = Color.RED;
  get color() {
    return this._color;
  }
  get isRed() {
    return isRed(this);
  }
  get isBlack() {
    return isBlack(this);
  }
  get sibling() {
    return super.sibling as RBTreeNode<T>;
  }
  /* istanbul ignore next */
  constructor(
    public val: T,
    public parent: RBTreeNode<T> | null = null,
    public left: RBTreeNode<T> | null = null,
    public right: RBTreeNode<T> | null = null
  ) {
    super(val, parent, left, right);
  }
  toRed() {
    return this.toColor(Color.RED);
  }
  toBlack() {
    return this.toColor(Color.BLACK);
  }
  toColor(color: Color) {
    this._color = color;
    return this;
  }
  toString() {
    return super.toString() + (this.isRed ? '(R)' : '');
  }
}
export class RBTree<T> extends BlanceBinarySearchTree<T> {
  protected createNode(
    val: T,
    parent: BinaryTreeNode<T> | null = null,
    left: BinaryTreeNode<T> | null = null,
    right: BinaryTreeNode<T> | null = null
  ): BinaryTreeNode<T> {
    return new RBTreeNode(
      val,
      parent as RBTreeNode<T> | null,
      left as RBTreeNode<T> | null,
      right as RBTreeNode<T> | null
    );
  }
  protected afterAdd(node: RBTreeNode<T>) {
    let parent = node.parent;
    if (parent === null) {
      node.toBlack();
      return;
    }
    if (isBlack(parent)) return;
    const grandParent = parent.parent!.toRed();
    const uncle = parent.sibling;
    if (isRed(uncle)) {
      parent.toBlack();
      uncle.toBlack();
      this.afterAdd(grandParent);
      return;
    }
    if (parent.isLeftChild) {
      if (node.isRightChild) {
        this.rotateLeft(parent);
        [node, parent] = [parent, node];
      }
      this.rotateRight(grandParent);
    } else {
      if (node.isLeftChild) {
        this.rotateRight(parent);
        [node, parent] = [parent, node];
      }
      this.rotateLeft(grandParent);
    }
    parent.toBlack();
    node.toRed();
  }
  protected afterRemove(node: RBTreeNode<T>) {
    if (node.isRed) {
      node.toBlack();
      return;
    }
    const parent = node.parent;
    if (parent === null) return;
    const isLeftChild = parent.left === null || node.isLeftChild;
    let sibling = isLeftChild ? parent.right! : parent.left!;
    if (isLeftChild) {
      if (sibling.isRed) {
        this.rotateLeft(parent);
        sibling.toBlack();
        parent.toRed();
        sibling = parent.right!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const isBlack = parent.isBlack;
        sibling.toRed();
        parent.toBlack();
        isBlack && this.afterRemove(parent);
      } else {
        if (isBlack(sibling.right)) {
          this.rotateRight(sibling);
          sibling = sibling.parent!;
        }
        this.rotateLeft(parent);
        sibling.toColor(parent.color);
        parent.toBlack();
        sibling.right?.toBlack();
      }
    } else {
      if (sibling.isRed) {
        this.rotateRight(parent);
        sibling.toBlack();
        parent.toRed();
        sibling = parent.left!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const isBlack = parent.isBlack;
        sibling.toRed();
        parent.toBlack();
        isBlack && this.afterRemove(parent);
      } else {
        if (isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = sibling.parent!;
        }
        this.rotateRight(parent);
        sibling.toColor(parent.color);
        parent.toBlack();
        sibling.left?.toBlack();
      }
    }
  }
}

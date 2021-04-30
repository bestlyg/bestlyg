import { BlanceBinarySearchTree } from './blanceBinarySearchTree';
import { BinaryTreeNode } from './binaryTree';
export enum Color {
  RED,
  BLACK,
}
const getColor = (node: RBTreeNode<any> | null) => (node === null ? Color.BLACK : node.color);
const isRed = (node: RBTreeNode<any> | null) => getColor(node) === Color.RED;
const isBlack = (node: RBTreeNode<any> | null) => getColor(node) === Color.BLACK;
export class RBTreeNode<T> extends BinaryTreeNode<T> {
  private _color = Color.RED;
  get color() {
    return this._color;
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
  setRed() {
    return this.setColor(Color.RED);
  }
  setBlack() {
    return this.setColor(Color.BLACK);
  }
  setColor(color: Color) {
    this._color = color;
    return this;
  }
  toString() {
    return super.toString() + (isRed(this) ? '(R)' : '');
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
      node.setBlack();
      return;
    }
    if (isBlack(parent)) return;
    const grandParent = parent.parent!.setRed();
    const uncle = parent.sibling;
    if (isRed(uncle)) {
      parent.setBlack();
      uncle.setBlack();
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
    parent.setBlack();
    node.setRed();
  }
  protected afterRemove(node: RBTreeNode<T>) {
    if (isRed(node)) {
      node.setBlack();
      return;
    }
    const parent = node.parent;
    if (parent === null) return;
    const isLeftChild = parent.left === null || node.isLeftChild;
    let sibling = isLeftChild ? parent.right! : parent.left!;
    if (isLeftChild) {
      if (isRed(sibling)) {
        this.rotateLeft(parent);
        sibling.setBlack();
        parent.setRed();
        sibling = parent.right!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const blackState = isBlack(parent);
        sibling.setRed();
        parent.setBlack();
        blackState && this.afterRemove(parent);
      } else {
        if (isBlack(sibling.right)) {
          this.rotateRight(sibling);
          sibling = sibling.parent!;
        }
        this.rotateLeft(parent);
        sibling.setColor(parent.color);
        parent.setBlack();
        sibling.right?.setBlack();
      }
    } else {
      if (isRed(sibling)) {
        this.rotateRight(parent);
        sibling.setBlack();
        parent.setRed();
        sibling = parent.left!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const blackState = isBlack(parent);
        sibling.setRed();
        parent.setBlack();
        blackState && this.afterRemove(parent);
      } else {
        if (isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = sibling.parent!;
        }
        this.rotateRight(parent);
        sibling.setColor(parent.color);
        parent.setBlack();
        sibling.left?.setBlack();
      }
    }
  }
}

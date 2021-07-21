import { BlanceBinarySearchTree } from './blanceBinarySearchTree';
import { BinaryTreeNode } from './binaryTree';
export class AVLTreeNode<T> extends BinaryTreeNode<T> {
  get leftHeight(): number {
    return (this.left as AVLTreeNode<T>)?.height ?? 0;
  }
  get rightHeight(): number {
    return (this.right as AVLTreeNode<T>)?.height ?? 0;
  }
  get balance() {
    return Math.abs(this.leftHeight - this.rightHeight) <= 1;
  }
  get height() {
    return Math.max(this.leftHeight, this.rightHeight) + 1;
  }
  /* istanbul ignore next */
  constructor(
    public val: T,
    public parent: AVLTreeNode<T> | null = null,
    public left: AVLTreeNode<T> | null = null,
    public right: AVLTreeNode<T> | null = null
  ) {
    super(val, parent, left, right);
  }
}
export class AVLTree<T> extends BlanceBinarySearchTree<T> {
  protected createNode(
    val: T,
    parent: BinaryTreeNode<T> | null = null,
    left: BinaryTreeNode<T> | null = null,
    right: BinaryTreeNode<T> | null = null
  ): BinaryTreeNode<T> {
    return new AVLTreeNode(
      val,
      parent as AVLTreeNode<T> | null,
      left as AVLTreeNode<T> | null,
      right as AVLTreeNode<T> | null
    );
  }
  protected afterAdd(node: AVLTreeNode<T>) {
    let parent = node.parent;
    while (parent !== null) {
      if (!parent.balance) {
        this.reBalance(parent);
        break;
      }
      parent = parent.parent;
    }
  }
  protected afterRemove(node: AVLTreeNode<T>) {
    let parent = node.parent;
    while (parent !== null) {
      if (!parent.balance) this.reBalance(parent);
      parent = parent.parent;
    }
  }
  private reBalance(grandParent: AVLTreeNode<T>) {
    const parent = this.getUnbalancedChild(grandParent);
    const child = this.getUnbalancedChild(parent);
    /**
     左右旋转1
    if (parent.isLeftChild) {
      // L
      if (child.isRightChild) this.rotateLeft(parent);
      this.rotateRight(grandParent);
    } else {
      // R
      if (child.isLeftChild) this.rotateRight(parent);
      this.rotateLeft(grandParent);
    }
     */
    if (parent.isLeftChild) {
      if (child.isLeftChild)
        this.rotate(
          grandParent,
          parent,
          child,
          child.left,
          child.right,
          grandParent,
          parent.right,
          grandParent.right
        );
      else
        this.rotate(
          grandParent,
          child,
          parent,
          parent.left,
          child.left,
          grandParent,
          child.right,
          grandParent.right
        );
    } else {
      // R
      if (child.isRightChild)
        this.rotate(
          grandParent,
          parent,
          grandParent,
          grandParent.left,
          parent.left,
          child,
          child.left,
          child.right
        );
      else
        this.rotate(
          grandParent,
          child,
          grandParent,
          grandParent.left,
          child.left,
          parent,
          child.right,
          parent.right
        );
    }
  }
  private getUnbalancedChild(node: AVLTreeNode<T>): AVLTreeNode<T> {
    return (
      node.leftHeight > node.rightHeight
        ? node.left
        : node.leftHeight < node.rightHeight
        ? node.right
        : node[node.childPosition]
    ) as AVLTreeNode<T>;
  }
}

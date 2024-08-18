import { BinarySearchTree } from './binarySearchTree';
import { BinaryTreeNode } from './binaryTree';
export class BlanceBinarySearchTree<T> extends BinarySearchTree<T> {
    /**
  左右旋转1
  protected rotateLeft(node: BinaryTreeNode<T>) {
    const right = node.right!;
    right.parent = node.parent;
    if (node.parent === null) this.root = right;
    else node.parent![node.childPosition] = right;
    node.right = right.left;
    if (right.left !== null) right.left.parent = node;
    right.left = node;
    node.parent = right;
  }
  protected rotateRight(node: BinaryTreeNode<T>) {
    const left = node.left!;
    left.parent = node.parent;
    if (node.parent === null) this.root = left;
    else node.parent![node.childPosition] = left;
    node.left = left.right;
    if (left.right !== null) left.right.parent = node;
    left.right = node;
    node.parent = left;
  } 
  */
    // 左右旋转2
    protected rotateLeft(grandParent: BinaryTreeNode<T>) {
        const parent = grandParent.right!;
        const child = parent.left;
        grandParent.right = child;
        parent.left = grandParent;
        this.afterRotate(grandParent, parent, child);
    }
    protected rotateRight(grandParent: BinaryTreeNode<T>) {
        const parent = grandParent.left!;
        const child = parent.right;
        grandParent.left = child;
        parent.right = grandParent;
        this.afterRotate(grandParent, parent, child);
    }
    private afterRotate(
        grandParent: BinaryTreeNode<T>,
        parent: BinaryTreeNode<T>,
        child: BinaryTreeNode<T> | null,
    ) {
        parent.parent = grandParent.parent;
        if (grandParent.parent === null) this.root = parent;
        else grandParent.parent[grandParent.childPosition] = parent;
        if (child !== null) child.parent = grandParent;
        grandParent.parent = parent;
    }
    /**
     * 统一旋转
     * @param oldCenter 老中间节点
     * @param center 新中间节点
     * @param left 左节点
     * @param leftLeftChild 左节点的左子节点
     * @param leftRightChild 左节点的右子节点
     * @param right 右节点
     * @param rightLeftChild 右节点的左子节点
     * @param rightRightChild 右节点的右子节点
     */
    protected rotate(
        oldCenter: BinaryTreeNode<T>,
        center: BinaryTreeNode<T>,
        left: BinaryTreeNode<T>,
        leftLeftChild: BinaryTreeNode<T> | null,
        leftRightChild: BinaryTreeNode<T> | null,
        right: BinaryTreeNode<T>,
        rightLeftChild: BinaryTreeNode<T> | null,
        rightRightChild: BinaryTreeNode<T> | null,
    ) {
        // center
        center.parent = oldCenter.parent;
        if (oldCenter.parent !== null) oldCenter.parent[oldCenter.childPosition] = center;
        else this.root = center;
        // left
        left.parent = center;
        center.left = left;
        left.left = leftLeftChild;
        if (leftLeftChild !== null) leftLeftChild.parent = left;
        left.right = leftRightChild;
        if (leftRightChild !== null) leftRightChild.parent = left;
        // right
        right.parent = center;
        center.right = right;
        right.left = rightLeftChild;
        if (rightLeftChild !== null) rightLeftChild.parent = right;
        right.right = rightRightChild;
        if (rightRightChild !== null) rightRightChild.parent = right;
    }
}

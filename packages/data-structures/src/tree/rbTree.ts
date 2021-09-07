import { BlanceBinarySearchTree } from './blanceBinarySearchTree';
import { BinaryTreeNode } from './binaryTree';
import { IBinarySearchTree } from './binarySearchTree';
export enum Color {
  RED,
  BLACK,
}
const getColor = (node: RBTreeNode<any> | null) => (node === null ? Color.BLACK : node.color);
const isRed = (node: RBTreeNode<any> | null) => getColor(node) === Color.RED;
const isBlack = (node: RBTreeNode<any> | null) => getColor(node) === Color.BLACK;

export interface IRBTree<T> extends IBinarySearchTree<T> {
  print: () => string;
  levelOrder: () => T[];
}
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
export class RBTree<T> extends BlanceBinarySearchTree<T> implements IRBTree<T> {
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
    // 如果父节点不存在，则添加的是根节点，直接染黑
    if (parent === null) {
      node.setBlack();
      return;
    }
    // 如果父节点是黑节点，则不做处理
    if (isBlack(parent)) return;
    const grandParent = parent.parent!.setRed();
    const uncle = parent.sibling;
    // 如果叔父节点是红色，则进行转换后上溢
    if (isRed(uncle)) {
      parent.setBlack();
      uncle.setBlack();
      this.afterAdd(grandParent);
      return;
    }
    // 判断旋转
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
    // 如果删除的是红色节点，则染黑后(考虑节点可能是被删除节点的唯一子节点时)不做处理
    if (isRed(node)) {
      node.setBlack();
      return;
    }
    const parent = node.parent;
    // 如果删除的时根节点则不动
    if (parent === null) return;
    // 判断删除的节点是否时左子节点（考虑可能是下溢产生的删除和正常删除）
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
      // 如果叔父节点是红色，则进行旋转使叔父节点染黑
      if (isRed(sibling)) {
        this.rotateRight(parent);
        sibling.setBlack();
        parent.setRed();
        sibling = parent.left!;
      }
      // 如果左右子树都为黑，则无真实子节点，则使父节点下溢
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const blackState = isBlack(parent);
        sibling.setRed();
        parent.setBlack();
        blackState && this.afterRemove(parent);
      } else {
        // 如果兄弟节点的左节点是黑色，则进行旋转
        if (isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = sibling.parent!;
        }
        this.rotateRight(parent);
        sibling.setColor(parent.color);
        sibling.left?.setBlack();
        parent.setBlack();
      }
    }
  }
}

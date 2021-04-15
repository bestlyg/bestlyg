export interface IBinarySearchTree<T> {
  /** 树中值的数量 */
  size: number;
  /** 树是否为空 */
  empty: boolean;
  /** 清空树 */
  clear(): void;
  /** 添加元素 */
  add(val: T): void;
  /** 删除元素 */
  remove(val: T): void;
  /** 是否包含某个元素 */
  contains(val: T): boolean;
}
export class BinarySearchTreeNode<T> {
  /** 树的度 */
  get degree() {
    if (this.left !== null && this.right !== null) return 2;
    else if (this.left !== null || this.right !== null) return 1;
    else return 0;
  }
  constructor(
    /** 节点储存的值 */
    public val: T,
    /** 父节点 */
    public parent: BinarySearchTreeNode<T> | null = null,
    /** 左子节点 */
    public left: BinarySearchTreeNode<T> | null = null,
    /** 右子节点 */
    public right: BinarySearchTreeNode<T> | null = null
  ) {}
  /** 从父节点移除自己 */
  remove() {
    if (this.parent.left === this) this.parent.left = null;
    else this.parent.right = null;
  }
}
export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  private root: BinarySearchTreeNode<T> | null = null;
  private _size = 0;
  get size() {
    return this._size;
  }
  get empty() {
    return this.size === 0;
  }
  constructor(private compare: (t1: T, t2: T) => number) {}
  clear() {
    this.root = null;
    this._size = 0;
  }
  add(val: T) {
    if (this.root === null) {
      this.root = new BinarySearchTreeNode(val);
      this._size++;
      return;
    }
    let node = this.root;
    while (node !== null) {
      const compare = this.compare(node.val, val);
      if (compare > 0) {
        if (node.left === null) {
          node.left = new BinarySearchTreeNode(val, node);
          this._size++;
          break;
        }
        node = node.left;
      } else if (compare < 0) {
        if (node.right === null) {
          node.right = new BinarySearchTreeNode(val, node);
          this._size++;
          break;
        }
        node = node.right;
      } else {
        node.val = val;
        break;
      }
    }
  }
  remove(val: T) {
    if (this.root === null) return;
    let node = this.root;
    while (node !== null) {
      const compare = this.compare(node.val, val);
      if (compare > 0) node = node.left;
      else if (compare < 0) node = node.right;
      else break;
    }
    if (node === null) return;
    this._size--;
    if (node.degree === 0) {
      if (node === this.root) this.root = null;
      else if (node.parent.left === node) node.parent.left = null;
      else node.parent.right = null;
    } else if (node.degree === 1) {
      if (node === this.root) {
        if (node.left !== null) {
          let predecessor = node.left;
          while (predecessor.right !== null) predecessor = predecessor.right;
          [predecessor.val, node.val] = [node.val, predecessor.val];
          predecessor.remove();
        } else {
          let successor = node.right;
          while (successor.left !== null) successor = successor.left;
          [node.val, successor.val] = [successor.val, node.val];
          successor.remove();
        }
      } else if (node.parent.left === node) {
        if (node.left !== null) node.parent.left = node.left;
        else node.parent.left = node.right;
      } else {
        if (node.left !== null) node.parent.right = node.left;
        else node.parent.right = node.right;
      }
    } else {
      let successor = node.right;
      while (successor.left !== null) successor = successor.left;
      [node.val, successor.val] = [successor.val, node.val];
      successor.remove();
    }
  }
  contains(val: T) {
    if (this.empty) return false;
    let node = this.root;
    while (node !== null) {
      const compare = this.compare(node.val, val);
      if (compare > 0) node = node.left;
      else if (compare < 0) node = node.right;
      else return true;
    }
    return false;
  }
  inorder(traversal: (val: T) => void) {
    const _inorder = (node: BinarySearchTreeNode<T> | null) => {
      if (node === null) return;
      _inorder(node.left);
      traversal(node.val);
      _inorder(node.right);
    };
    _inorder(this.root);
  }
}

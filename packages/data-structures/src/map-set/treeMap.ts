import { Map } from './map';
const RED = true;
const BLACK = false;
type Color = boolean;
const isRed = (node: TreeMapNode<any, any> | null) => node?.color === RED;
const isBlack = (node: TreeMapNode<any, any> | null) => node === null || node?.color === BLACK;
const setColor = (node: TreeMapNode<any, any> | null, color: Color) => {
  if (node) node.color = color;
};
const setRed = (node: TreeMapNode<any, any> | null) => setColor(node, RED);
const setBlack = (node: TreeMapNode<any, any> | null) => setColor(node, BLACK);
export class TreeMapNode<K, V> {
  color = RED;
  left: TreeMapNode<K, V> | null = null;
  right: TreeMapNode<K, V> | null = null;
  constructor(public key: K, public val: V, public parent: TreeMapNode<K, V> | null = null) {}
  toString() {
    return this.val + (isRed(this) ? '(R)' : '');
  }
}
export class TreeMap<K, V> implements Map<K, V> {
  private _size = 0;
  get size() {
    return this._size;
  }
  get empty() {
    return this._size === 0;
  }
  private root: TreeMapNode<K, V> | null = null;
  constructor(private compare: (k1: K, k2: K) => number) {}
  clear() {
    this.root = null;
    this._size = 0;
  }
  contains(key: K) {
    return this.findNode(key) !== null;
  }
  get(key: K) {
    return this.findNode(key)?.val ?? undefined;
  }
  set(key: K, val: V) {
    let node = this.findNode(key);
    if (node !== null) {
      node.val = val;
      return false;
    }
    if (this.root === null) {
      this.root = node = new TreeMapNode<K, V>(key, val);
    } else {
      let parent = this.root;
      let pos = 'left';
      while (parent !== null) {
        const compare = this.compare(parent.key, key);
        if (compare > 0) {
          if (parent.left === null) break;
          parent = parent.left;
        } else {
          if (parent.right === null) {
            pos = 'right';
            break;
          }
          parent = parent.right;
        }
      }
      parent[pos] = node = new TreeMapNode<K, V>(key, val, parent);
    }
    this._size++;
    this.afterSet(node);
    return true;
  }
  private afterSet(node: TreeMapNode<K, V>) {
    let parent = node.parent;
    if (parent === null) {
      setBlack(node);
      return;
    }
    if (isBlack(parent)) return;
    const grand = parent.parent!;
    const sibling = grand.left === parent ? grand.right! : grand.left!;
    if (isRed(sibling)) {
      setBlack(parent);
      setBlack(sibling);
      setRed(grand);
      this.afterSet(grand);
      return;
    }
    if (grand.left === parent) {
      if (parent.right === node) {
        this.rotateL(parent);
        [parent, node] = [node, parent];
      }
      this.rotateR(grand);
    } else {
      if (parent.left === node) {
        this.rotateR(parent);
        [parent, node] = [node, parent];
      }
      this.rotateL(grand);
    }
    setBlack(parent);
    setRed(node);
    setRed(grand);
  }
  remove(key: K) {
    let node = this.findNode(key);
    if (node === null) return false;
    if (node.left !== null && node.right !== null) {
      const successor = this.successor(node);
      [node.key, node.val, successor.key, successor.val] = [
        successor.key,
        successor.val,
        node.key,
        node.val,
      ];
      node = successor;
    }
    const parent = node.parent!;
    this._size--;
    if (node.left === null && node.right === null) {
      if (this.root === node) {
        this.clear();
        return true;
      }
      const pos = parent.left === node ? 'left' : 'right';
      parent[pos] = null;
      this.afterRemove(node);
      return true;
    }
    const childNode = node.left ?? node.right!;
    if (parent === null) this.root = childNode;
    else {
      const pos = parent.left === node ? 'left' : 'right';
      parent[pos] = childNode;
    }
    childNode.parent = parent;
    this.afterRemove(childNode);
    return true;
  }
  private afterRemove(node: TreeMapNode<K, V>) {
    if (isRed(node)) {
      setBlack(node);
      return;
    }
    const parent = node.parent;
    if (parent === null) return;
    const leftChild = parent.left === null || parent.left === node;
    let sibling = leftChild ? parent.right! : parent.left!;
    if (leftChild) {
      if (isRed(sibling)) {
        this.rotateL(parent);
        setBlack(sibling);
        setRed(parent);
        sibling = parent.right!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentIsBlack = isBlack(parent);
        setRed(sibling);
        setBlack(parent);
        parentIsBlack && this.afterRemove(parent);
        return;
      }
      if (isBlack(sibling.right)) {
        this.rotateR(sibling);
        sibling = sibling.parent!;
      }
      this.rotateL(parent);
      setColor(sibling, parent.color);
      setBlack(parent);
      setBlack(sibling.right);
    } else {
      if (isRed(sibling)) {
        this.rotateR(parent);
        setBlack(sibling);
        setRed(parent);
        sibling = parent.left!;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentIsBlack = isBlack(parent);
        setRed(sibling);
        setBlack(parent);
        parentIsBlack && this.afterRemove(parent);
        return;
      }
      if (isBlack(sibling.left)) {
        this.rotateL(sibling);
        sibling = sibling.parent!;
      }
      this.rotateR(parent);
      setColor(sibling, parent.color);
      setBlack(parent);
      setBlack(sibling.left);
    }
  }
  private successor(node: TreeMapNode<K, V>) {
    let successor = node.right!;
    while (successor.left) successor = successor.left;
    return successor;
  }
  private findNode(key: K, root = this.root): TreeMapNode<K, V> | null {
    if (root === null) return null;
    const compare = this.compare(root.key, key);
    if (compare > 0) return this.findNode(key, root.left);
    if (compare < 0) return this.findNode(key, root.right);
    return root;
  }
  private rotateL(grand: TreeMapNode<K, V>) {
    const root = grand.parent;
    const parent = grand.right!;
    if (root === null) this.root = parent;
    else {
      const pos = root.left === grand ? 'left' : 'right';
      root[pos] = parent;
    }
    grand.right = parent.left;
    if (parent.left) parent.left.parent = grand;
    parent.left = grand;
    grand.parent = parent;
    parent.parent = root;
  }
  private rotateR(grand: TreeMapNode<K, V>) {
    const root = grand.parent;
    const parent = grand.left!;
    if (root === null) this.root = parent;
    else {
      const pos = root.left === grand ? 'left' : 'right';
      root[pos] = parent;
    }
    grand.left = parent.right;
    if (parent.right) parent.right.parent = grand;
    parent.right = grand;
    grand.parent = parent;
    parent.parent = root;
  }
}

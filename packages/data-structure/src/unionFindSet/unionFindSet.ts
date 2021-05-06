/**
 * 并查集节点
 */
export class UnionFindSetNode<T> {
  /** 所引用得节点数 */
  size = 1;
  /** 父节点 */
  parent: UnionFindSetNode<T> = this;
  constructor(public val: T) {}
}
export class UnionFindSet<T> {
  private _size = 0;
  /** 包含的集合数 */
  get size() {
    return this._size;
  }
  /** 集合储存 */
  map = new Map<T, UnionFindSetNode<T>>();
  /** 添加新节点 */
  add(val: T) {
    if (this.map.has(val)) return;
    this.map.set(val, new UnionFindSetNode(val));
    this._size++;
  }
  /** 比较两个节点是否属于同一节点 */
  same(val1: T, val2: T) {
    const root1 = this.find(val1);
    const root2 = this.find(val2);
    return root1 && root2 ? root1 === root2 : false;
  }
  /** 查找节点的根节点 */
  find(val: T): T | null {
    return this.findRoot(val)?.val ?? null;
  }
  /** 合并两个节点 */
  union(val1: T, val2: T) {
    const root1: UnionFindSetNode<T> = this.findRoot(val1)!;
    const root2: UnionFindSetNode<T> = this.findRoot(val2)!;
    if (!root1 || !root2 || root1 === root2) return;
    this._size--;
    if (root1.size >= root2.size) {
      root2.parent = root1;
      root1.size += root2.size;
      root2.size = 1;
    } else {
      root1.parent = root2;
      root2.size += root1.size;
      root1.size = 1;
    }
  }
  private findRoot(val: T): UnionFindSetNode<T> | null {
    let node: UnionFindSetNode<T> = this.map.get(val)!;
    if (!node) return null;
    while (node.parent !== node) {
      node.parent = node.parent.parent;
      node = node.parent;
    }
    return node;
  }
}

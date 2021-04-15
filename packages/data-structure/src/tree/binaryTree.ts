/**
 * 树节点类
 * 节点储存只只能为number类型
 * 可用于LeetCode题
 */
export class BinaryTreeNode {
  /**
   * 构造树
   * @param arr
   */
  static create(arr: (number | null)[]): BinaryTreeNode | null {
    if (arr.length === 0) return null;
    let root = new BinaryTreeNode(arr.shift() as number);
    const queue = [root];
    while (queue.length !== 0) {
      const node = queue.shift() as BinaryTreeNode;
      let temp = arr.shift();
      if (temp !== null && temp !== undefined) {
        node.left = new BinaryTreeNode(temp);
        queue.push(node.left);
      }
      temp = arr.shift();
      if (temp !== null && temp !== undefined) {
        node.right = new BinaryTreeNode(temp);
        queue.push(node.right);
      }
    }
    return root;
  }
  /**
   * 反序列化
   * 通过字符串序列化成一棵树
   */
  static deserialize(data: string): BinaryTreeNode | null {
    if (data === '[]') return null;
    const arr: (number | null)[] = data
      .substring(1, data.length - 1)
      .split(',')
      .map(v => (v === 'null' ? null : Number(v)));
    return this.create(arr);
  }
  /**
   * 序列化
   * 把树序列化成字符串类似于[1,2,null,3]的结构
   * 层序遍历序列化
   */
  static serialize(node: BinaryTreeNode | null): string {
    const queue = [node];
    const hasNum = () => queue.some(v => v !== null);
    let str = '';
    while (hasNum()) {
      const node = queue.shift() as BinaryTreeNode | null;
      if (node === null) {
        str += 'null,';
        continue;
      } else {
        str += node.val + ',';
      }
      if (node.left !== null) queue.push(node.left);
      else queue.push(null);
      if (node.right !== null) queue.push(node.right);
      else queue.push(null);
    }
    return `[${str.substr(0, str.length - 1)}]`;
  }
  /**
   * 树的前序遍历
   * @param node
   * @param visitor
   */
  static preorder(node: BinaryTreeNode | null, visitor: (node: BinaryTreeNode) => boolean): void {
    let f = false;
    _preorder(node);
    function _preorder(node: BinaryTreeNode | null): void {
      if (node === null || f) return;
      f = visitor(node);
      node.left !== null && _preorder(node.left);
      node.right !== null && _preorder(node.right);
    }
  }
  /**
   * 树的中序遍历
   * @param node
   * @param visitor
   */
  static inorder(node: BinaryTreeNode, visitor: (node: BinaryTreeNode) => boolean): void {
    let f = false;
    _inorder(node);
    function _inorder(node: BinaryTreeNode | null): void {
      if (node === null || f) return;
      _inorder(node.left);
      if (f) return;
      f = visitor(node);
      _inorder(node.right);
    }
  }
  /**
   * 树的层序遍历
   * @param node
   * @param visitor
   */
  static levelOrder(node: BinaryTreeNode, visitor: (node: BinaryTreeNode) => boolean): void {
    const queue = [node];
    while (queue.length !== 0) {
      const node = queue.shift() as BinaryTreeNode;
      if (visitor(node)) return;
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  /**
   * 打印树
   * @param {BinaryTreeNode} node
   */
  static print(node: BinaryTreeNode): void {
    let s = '';
    BinaryTreeNode.levelOrder(node, node => {
      s += node.val + ' ';
      return false;
    });
    console.log(s.substr(0, s.length - 1));
  }
  constructor(
    public val: number = 0,
    public left: BinaryTreeNode | null = null,
    public right: BinaryTreeNode | null = null
  ) {}
  print(): void {
    BinaryTreeNode.print(this);
  }
  preorder(visitor: (node: BinaryTreeNode) => boolean): void {
    BinaryTreeNode.preorder(this, visitor);
  }
  inorder(visitor: (node: BinaryTreeNode) => boolean): void {
    BinaryTreeNode.inorder(this, visitor);
  }
  levelOrder(visitor: (node: BinaryTreeNode) => boolean): void {
    BinaryTreeNode.levelOrder(this, visitor);
  }
  serialize(): string {
    return BinaryTreeNode.serialize(this);
  }
}

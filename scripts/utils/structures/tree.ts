/**
 * 树节点类
 */
export class TreeNode {
  /**
   * 构造树
   * @param arr
   */
  static factory(arr: (number | null)[]): TreeNode | null {
    if (arr.length === 0) return null;
    let root = new TreeNode(arr.shift() as number);
    const queue = [root];
    while (queue.length !== 0) {
      const node = queue.shift() as TreeNode;
      let temp = arr.shift();
      if (temp !== null && temp !== undefined) {
        node.left = new TreeNode(temp);
        queue.push(node.left);
      }
      temp = arr.shift();
      if (temp !== null && temp !== undefined) {
        node.right = new TreeNode(temp);
        queue.push(node.right);
      }
    }
    return root;
  }
  static deserialize(data: string): TreeNode | null {
    if (data === '[]') return null;
    const arr: (number | null)[] = data
      .substring(1, data.length - 1)
      .split(',')
      .map(v => (v === 'null' ? null : Number(v)));
    return this.factory(arr);
  }
  static serialize(node: TreeNode | null): string {
    const queue = [node];
    const hasNum = () => queue.some(v => v !== null);
    let str = '';
    while (hasNum()) {
      const node = queue.shift() as TreeNode | null;
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
  static preorder(node: TreeNode | null, visitor: (node: TreeNode) => boolean): void {
    let f = false;
    _preorder(node);
    function _preorder(node: TreeNode | null): void {
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
  static inorder(node: TreeNode, visitor: (node: TreeNode) => boolean): void {
    let f = false;
    _inorder(node);
    function _inorder(node: TreeNode | null): void {
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
  static levelOrder(node: TreeNode, visitor: (node: TreeNode) => boolean): void {
    const queue = [node];
    while (queue.length !== 0) {
      const node = queue.shift() as TreeNode;
      if (visitor(node)) return;
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }
  /**
   * 打印树
   * @param {TreeNode} node
   */
  static print(node: TreeNode): void {
    let s = '';
    TreeNode.levelOrder(node, node => {
      s += node.val + ' ';
      return false;
    });
    console.log(s.substr(0, s.length - 1));
  }
  constructor(
    public val: number = 0,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
  print(): void {
    TreeNode.print(this);
  }
  preorder(visitor: (node: TreeNode) => boolean): void {
    TreeNode.preorder(this, visitor);
  }
  inorder(visitor: (node: TreeNode) => boolean): void {
    TreeNode.inorder(this, visitor);
  }
  levelOrder(visitor: (node: TreeNode) => boolean): void {
    TreeNode.levelOrder(this, visitor);
  }
  serialize(): string {
    return TreeNode.serialize(this);
  }
}

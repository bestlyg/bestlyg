/** 二叉树节点 */
export class BinaryTreeNode<T> {
  constructor(
    public val: T,
    public left: BinaryTreeNode<T> | null = null,
    public right: BinaryTreeNode<T> | null = null
  ) {}
}
/**
 * 前序遍历
 * 先读取val值，再遍历左节点，再遍历右节点
 */
export function preorder<T>(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
  if (node === null) return queue;
  queue.push(node.val);
  preorder(node.left, queue);
  preorder(node.right, queue);
  return queue;
}
/**
 * 中序遍历
 * 先遍历左节点，再读取val值，再遍历右节点
 */
export function inorder<T>(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
  if (node === null) return queue;
  preorder(node.left, queue);
  queue.push(node.val);
  preorder(node.right, queue);
  return queue;
}
/**
 * 后序遍历
 * 先遍历左节点，再遍历右节点，再读取val值
 */
export function postorder<T>(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
  if (node === null) return queue;
  preorder(node.left, queue);
  preorder(node.right, queue);
  queue.push(node.val);
  return queue;
}
/**
 * 层序遍历
 * 按行遍历树
 */
export function levelOrder<T>(node: BinaryTreeNode<T> | null, queue: T[]): T[] {
  if (node === null) return queue;
  const _queue: BinaryTreeNode<T>[] = [node];
  while (_queue.length !== 0) {
    const node = _queue.shift();
    queue.push(node.val);
    node.left && _queue.push(node.left);
    node.right && _queue.push(node.right);
  }
  return queue;
}

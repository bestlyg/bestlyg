export class ListNode {
  /**
   * 构造链表
   * @param arr
   */
  static factory(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const root = new ListNode(arr.shift());
    let temp = root;
    for (const val of arr) {
      temp.next = new ListNode(val);
      temp = temp.next;
    }
    return root;
  }
  /**
   * 遍历链表
   * @param node
   * @param visitor
   */
  static traversal(node: ListNode, visitor: (node: ListNode) => boolean): void {
    let temp: ListNode | null = node;
    while (temp !== null) {
      if (visitor(temp)) return;
      temp = temp.next;
    }
  }
  /**
   * 打印链表
   * @param node
   */
  static print(node: ListNode): void {
    let s = '',
      temp: ListNode | null = node;
    while (temp !== null) {
      s += temp.val + ' ';
      temp = temp.next;
    }
    console.log(s.substr(0, s.length - 1));
  }
  /**
   * 翻转链表长度
   * @param node
   */
  static reverse(node: ListNode): ListNode {
    let newRoot: ListNode;
    function _reverse(node: ListNode, prevNode: ListNode | null) {
      if (node.next !== null) _reverse(node.next, node);
      else newRoot = node;
      node.next = prevNode;
    }
    _reverse(node, null);
    return newRoot!;
  }
  /**
   * 获取链表最后一个节点
   * @param node
   */
  static lastNode(node: ListNode): ListNode | null {
    let temp = node;
    if (temp === null) return null;
    while (temp.next !== null) temp = temp.next;
    return temp;
  }
  /**
   * 获取链表长度
   * @param node
   */
  static len(node: ListNode): number {
    let l = 0;
    let temp: ListNode | null = node;
    if (temp === null) return l;
    while (temp !== null) {
      l++;
      temp = temp.next;
    }
    return l;
  }
  constructor(public val: number = 0, public next: ListNode | null = null) {}
  traversal(visitor: (node: ListNode) => boolean): void {
    ListNode.traversal(this, visitor);
  }
  print(): void {
    ListNode.print(this);
  }
  length(): number {
    return ListNode.len(this);
  }
  reverse(): ListNode {
    return ListNode.reverse(this);
  }
  lastNode(): ListNode | null {
    return ListNode.lastNode(this);
  }
}

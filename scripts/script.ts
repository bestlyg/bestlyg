import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*        

 */
class Node {
  val: number;
  next: Node | null;
  random: Node | null;
  constructor(val?: number, next?: Node | null, random?: Node | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}
function copyRandomList(head: Node | null): Node | null {
  if (head === null) return null;
  let p: Node | null = head;
  while (p) {
    const next = p.next;
    const newNode = new Node(p.val, next);
    p.next = newNode;
    p = next;
  }
  p = head;
  while (p) {
    const newNode = p.next;
    newNode!.random = p.random?.next ?? null;
    p = p.next!.next;
  }
  p = head;
  const ans = head.next;
  while (p) {
    const next = p.next?.next ?? null;
    const newNode = p.next!;
    newNode.next = next?.next ?? null;
    p.next = next;
    p = next;
  }
  return ans;
}
// [[7,null],[13,0],[11,4],[10,2],[1,0]]
const node0 = new Node(7);
const node1 = (node0.next = new Node(13));
const node2 = (node1.next = new Node(11));
const node3 = (node2.next = new Node(10));
const node4 = (node3.next = new Node(1));
node0.random = null;
node1.random = node0;
node2.random = node4;
node3.random = node2;
node4.random = node0;
const newNode = copyRandomList(node0);
let p = newNode;
while (p) {
  console.log(p.val, p.random?.val ?? null);
  p = p.next;
}

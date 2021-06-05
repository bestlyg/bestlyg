import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 2 3 4 5 6 7 8 9 10



 */

function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (head === null) return null;
  const tempHead = new ListNode(0, head);
  let p: ListNode | null = tempHead;
  while (p !== null) {
    let next: ListNode | null = p.next;
    while (next !== null && next.val === val) next = next.next;
    p.next = next;
    p = next;
  }
  return tempHead.next;
}
removeElements(ListNode.factory([1, 2, 6, 3, 4, 5, 6]), 6)?.print();

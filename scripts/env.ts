import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';

/*

 2 3 4 5 6 7 8 9 10



 */
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (headA === null || headB === null) return null;
  const setA = new Set<ListNode>();
  const setB = new Set<ListNode>();
  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;
  while (pA !== null && pB !== null) {
    setA.add(pA);
    setB.add(pB);
    if (setB.has(pA)) return pA;
    if (setA.has(pB)) return pB;
    pA = pA.next;
    pB = pB.next;
  }
  while (pA !== null) {
    if (setB.has(pA)) return pA;
    pA = pA.next;
  }
  while (pB !== null) {
    if (setA.has(pB)) return pB;
    pB = pB.next;
  }
  return null;
}

import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function isPalindrome(head: ListNode): boolean {
  let slow = head;
  let fast = head.next;
  if (!fast) return true;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  fast = reverse(slow.next!);
  slow = head;
  console.log(slow, fast);
  while (fast) {
    if (slow.val !== fast.val) return false;
    slow = slow.next!;
    fast = fast.next!;
  }
  return true;
  function reverse(node: ListNode): ListNode {
    console.log(node);
    const head = new ListNode();
    let p: ListNode | null = node;
    while (p) {
      console.log('=');
      const oldNext = head.next;
      const next = p.next;
      head.next = p;
      p.next = oldNext;
      p = next;
      console.log(head);
    }
    return head.next!;
  }
}
console.log(isPalindrome(ListNode.factory([1, 2, 3, 4, 5, 6])!));

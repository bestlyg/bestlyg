import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast && k) {
    fast = fast.next;
    k--;
  }
  while (fast) {
    fast = fast.next;
    slow = slow!.next;
  }
  return slow;
}
console.log(getKthFromEnd(ListNode.factory([1, 2, 3, 4, 5]), 2));

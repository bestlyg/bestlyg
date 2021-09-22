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
function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
  let len = 0;
  let p = head;
  for (; p; p = p.next) len++;
  const cnt = ~~(len / k);
  const last = (len % k) - 1;
  const ans: Array<ListNode | null> = new Array(k).fill(null);
  let andIdx = 0;
  p = head;
  let max = cnt + (ans.length <= last ? 1 : 0);
  let idx = 0;
  while (p) {
    if (idx === 0) ans[andIdx++] = p;
    if (idx === max - 1) {
      max = cnt + (ans.length <= last ? 1 : 0);
      const next = p.next;
      p.next = null;
      p = next;
      idx = 0;
    } else {
      p = p.next;
      idx++;
    }
  }
  return ans;
}
console.log(splitListToParts(ListNode.factory([1, 2, 3, 4, 5, 6]), 7));

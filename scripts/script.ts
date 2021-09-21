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
class Solution {
  private max = 0;
  constructor(private head: ListNode | null) {
    if (head === null) return;
    let p: ListNode | null = head;
    while (p) {
      this.max += p.val;
      p = p.next;
    }
  }
  getRandom(): number {
    let random = this.random(0, this.max);
    let p: ListNode = this.head!;
    while (p && random > p.val) {
      random -= p.val;
      p = p.next!;
    }
    return p.val;
  }
  random(min: number, max: number): number {
    return min + ~~(Math.random() * (max - min + 1));
  }
}
const obj = new Solution(ListNode.factory([1, 2, 3, 4, 5, 6]));
console.log(obj.getRandom());

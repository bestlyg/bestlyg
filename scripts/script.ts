import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
class StockSpanner {
  private arr: number[] = [];
  private stack: number[] = [];
  next(price: number): number {
    const i = this.arr.length;
    this.arr.push(price);
    while (this.stack.length && price > this.arr[this.stack[this.stack.length - 1]])
      this.stack.pop()!;
    const ans = i - (this.stack[this.stack.length - 1] ?? -1);
    this.stack.push(i);
    return ans;
  }
}
const s = new StockSpanner();
console.log(s.next(100));
console.log(s.next(80));
console.log(s.next(60));
console.log(s.next(70));

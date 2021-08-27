import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
class MedianFinder {
  left = new Heap<number>((t1, t2) => t1 - t2);
  right = new Heap<number>((t1, t2) => t2 - t1);
  get cnt() {
    return this.left.size + this.right.size;
  }
  addNum(num: number): void {
    if (this.left.size === 0 && this.right.size === 0) {
      this.left.add(num);
    } else if (this.left.top < num) {
      this.right.add(num);
    } else {
      this.left.add(num);
    }
    if (this.right.size + 1 > this.left.size) this.left.add(this.right.remove());
    if (this.left.size - 1 > this.right.size) this.right.add(this.left.remove());
  }
  findMedian(): number {
    console.log(this.left);
    console.log(this.right);
    return this.cnt % 2 === 0 ? (this.left.top + this.right.top) / 2 : this.left.top;
  }
}
let obj = new MedianFinder();
obj.addNum(1);
obj.addNum(2);
console.log(obj.findMedian());
obj.addNum(3);

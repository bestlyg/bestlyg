import { structures, log } from './utils';
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
class SummaryRanges {
  private set = new Set<number>();
  private list: number[] = [];
  addNum(val: number): void {
    if (this.set.has(val)) return;
    this.set.add(val);
    let l = 0;
    let r = this.list.length - 1;
    if (this.list[r] < val) {
      this.list.push(val);
      return;
    }
    while (l < r) {
      const mid = (l + r) >> 1;
      if (this.list[mid] > val) r = mid;
      else l = mid + 1;
    }
    this.list.splice(l, 0, val);
  }
  getIntervals(): number[][] {
    const ans: number[][] = [];
    for (let i = 0, l = this.list.length; i < l; i++) {
      const num = this.list[i];
      const last = ans[ans.length - 1];
      if (ans.length === 0 || last[1] + 1 < num) {
        ans.push([num, num]);
      } else {
        last[1] = num;
      }
    }
    return ans;
  }
}
const obj = new SummaryRanges();
obj.addNum(1);
obj.addNum(3);
log([obj]);

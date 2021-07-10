import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
class TimeMap {
  private map: Record<string, [string, number][]> = {};
  set(key: string, value: string, timestamp: number): void {
    let list = this.map[key];
    if (!list) this.map[key] = list = [];
    list.push([value, timestamp]);
  }
  get(key: string, timestamp: number): string {
    return this.find(this.map[key] ?? [], timestamp);
  }
  private find(
    list: [string, number][],
    timestamp: number,
    first = 0,
    last = list.length - 1
  ): string {
    console.log(list, timestamp, first, last);
    if (first > last) {
      while (first > list.length - 1) first--;
      while (first >= 0) {
        if (list[first][1] < timestamp) return list[first][0];
        first--;
      }
      return '';
    }
    const mid = (first + last) >> 1;
    const [midStr, midTime] = list[mid];
    if (midTime > timestamp) return this.find(list, timestamp, first, mid - 1);
    else if (midTime < timestamp) return this.find(list, timestamp, mid + 1, last);
    else return midStr;
  }
}
const map = new TimeMap();
map.set('foo', 'bar', 1);
console.log(map.get('foo', 1));
console.log(map.get('foo', 3));

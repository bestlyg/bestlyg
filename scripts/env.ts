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

const getTime = (hour: number, minute: number): string =>
  `${hour}:${minute < 10 ? '0' + minute : minute}`;
const getList = (count: number, data: number[], maxNumber) => {
  const ans: Set<number> = new Set();
  if (count >= data.length) return ans;
  if (count === 0) {
    ans.add(0);
    return ans;
  }
  for (let i = 0, len = data.length; i < len; i++) {
    const num = 1 << data[i];
    const list = getList(count - 1, [...data.slice(0, i), ...data.slice(i + 1)], maxNumber);
    if (list.size === 0) ans.add(num);
    else {
      list.forEach(v => {
        const item = v | num;
        item <= maxNumber && ans.add(item);
      });
    }
  }
  return ans;
};
const getHourList = (count: number) =>
  getList(
    count,
    new Array(4).fill(0).map((_, i) => i),
    11
  );
const getMinuteList = (count: number) =>
  getList(
    count,
    new Array(6).fill(0).map((_, i) => i),
    59
  );
function readBinaryWatch(turnedOn: number): string[] {
  if (turnedOn >= 9) return [];
  if (turnedOn === 0) return ['0:00'];
  return new Array(Math.min(4, turnedOn) + 1)
    .fill(0)
    .map((_, i) => {
      return [i, turnedOn - i];
    })
    .map(([hour, minute]) => {
      const ans: string[] = [];
      const hourList = getHourList(hour);
      const minuteList = getMinuteList(minute);
      if (hourList.size === 0 || minuteList.size === 0) return ans;
      for (const hour of hourList) {
        for (const minute of minuteList) {
          ans.push(getTime(hour, minute));
        }
      }
      return ans;
    })
    .flat();
}
console.log(readBinaryWatch(7));

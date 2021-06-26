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

function openLock(deadends: string[], target: string): number {
  const prevMap: Record<string, string> = {
    0: '9',
    1: '0',
    2: '1',
    3: '2',
    4: '3',
    5: '4',
    6: '5',
    7: '6',
    8: '7',
    9: '8',
  };
  const nextMap: Record<string, string> = {
    0: '1',
    1: '2',
    2: '3',
    3: '4',
    4: '5',
    5: '6',
    6: '7',
    7: '8',
    8: '9',
    9: '0',
  };
  const INIT_STR = '0000';
  const set = new Set(deadends);
  if (set.has(INIT_STR)) return -1;
  if (target === INIT_STR) return 0;
  const queue = [INIT_STR];
  const map = new Map<string, number>([[INIT_STR, 0]]);
  let ans = Infinity;
  const updateQueue = (str: string, index: number, dict: Record<string, string>, step: number) => {
    const replaceStr = str.substring(0, index) + dict[str[index]] + str.substring(index + 1);
    if (replaceStr === target) {
      ans = Math.min(ans, step + 1);
      return;
    }
    if (!set.has(replaceStr)) {
      map.has(replaceStr) || queue.push(replaceStr);
      map.set(replaceStr, Math.min(map.get(replaceStr) ?? Infinity, step + 1));
    }
  };
  while (queue.length !== 0) {
    const str = queue.shift()!;
    const step = map.get(str)!;
    for (let i = 0; i < 4; i++) {
      updateQueue(str, i, prevMap, step);
      updateQueue(str, i, nextMap, step);
    }
  }
  return ans === Infinity ? -1 : ans;
}
console.log(openLock(['0201', '0101', '0102', '1212', '2002'], '0202'));

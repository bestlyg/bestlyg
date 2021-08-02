import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */
class NetNode {
  next: [NetNode, number][] = [];
  constructor(public val: number) {}
}
function getMap(times: number[][]): Map<number, NetNode> {
  const map = new Map<number, NetNode>();
  for (const [start, end, time] of times) {
    let startNode = map.get(start);
    if (!startNode) map.set(start, (startNode = new NetNode(start)));
    let endNode = map.get(end);
    if (!endNode) map.set(end, (endNode = new NetNode(end)));
    startNode.next.push([endNode, time]);
  }
  return map;
}
function networkDelayTime(times: number[][], n: number, k: number): number {
  const map = getMap(times);
  const init = map.get(k)!;
  const q: [NetNode, number][] = [[init, 0]];
  const set = new Set<NetNode>();
  let ans = -1;
  while (q.length) {
    const nextQ: [NetNode, number][] = [];
    let f = false;
    while (q.length) {
      const info = q.shift()!;
      if (set.has(info[0])) continue;
      f = true;
      if (info[1] === 0) {
        set.add(info[0]);
        for (const [next, time] of info[0].next) {
          if (time !== 0) set.has(next) || nextQ.push([next, time - 1]);
          else q.push([next, time]);
        }
      } else {
        info[1]--;
        nextQ.push(info);
      }
    }
    q.push(...nextQ);
    if (f) ans++;
  }
  return set.size === n ? ans : -1;
}
console.log(
  networkDelayTime(
    [
      [3, 5, 78],
      [2, 1, 1],
      [1, 3, 0],
      [4, 3, 59],
      [5, 3, 85],
      [5, 2, 22],
      [2, 4, 23],
      [1, 4, 43],
      [4, 5, 75],
      [5, 1, 15],
      [1, 5, 91],
      [4, 1, 16],
      [3, 2, 98],
      [3, 4, 22],
      [5, 4, 31],
      [1, 2, 0],
      [2, 5, 4],
      [4, 2, 51],
      [3, 1, 36],
      [2, 3, 59],
    ],
    5,
    5
  )
);

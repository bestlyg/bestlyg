import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */
function findMaxValueOfEquation(points: number[][], k: number): number {
  const queue: number[] = [];
  let ans = -Infinity;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (queue.length && p[0] - points[queue[0]][0] > k) queue.shift();
    if (queue.length) {
      ans = Math.max(ans, p[0] + p[1] + points[queue[0]][1] - points[queue[0]][0]);
    }
    while (
      queue.length &&
      points[queue[queue.length - 1]][1] - points[queue[queue.length - 1]][0] < p[1] - p[0]
    )
      queue.pop();
    queue.push(i);
  }
  return ans;
}
console.log(
  findMaxValueOfEquation(
    [
      [-17, -6],
      [-4, 0],
      [-2, -16],
      [-1, 2],
      [0, 11],
      [6, 18],
    ],
    13
  )
);

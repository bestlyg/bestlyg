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
function getSkyline(buildings: number[][]): number[][] {
  const list: [number, number][] = [];
  buildings.forEach(([l, r, h]) => list.push([l, -h], [r, h]));
  list.sort(([i1, h1], [i2, h2]) => (i1 === i2 ? h1 - h2 : i1 - i2));
  const heights: number[] = [0];
  const remove = (h: number) => {
    for (let i = 0, l = heights.length; i < l; i++)
      if (heights[i] === h) {
        heights.splice(i, 1);
        return;
      }
  };
  let ans: number[][] = [];
  let preH: number | null = null;
  for (const [idx, h] of list) {
    if (h < 0) heights.push(-h);
    else remove(h);
    let maxH = Math.max(...heights);
    if (preH !== maxH) ans.push([idx, (preH = maxH)]);
  }
  return ans;
}
console.log(
  getSkyline([
    [0, 2, 3],
    [2, 5, 3],
  ])
);

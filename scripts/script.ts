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
function kWeakestRows(mat: number[][], k: number): number[] {
  return mat
    .map((list, i) => [i, find(list)]).map(v => {
      console.log(v)
      return v
    })
    .sort(([i1, v1], [i2, v2]) => (v1 === v2 ? i1 - i2 : v1 - v2))
    .map(([i]) => i)
    .slice(0, k);
  function find(list: number[]): number {
    let l = 0;
    let r = list.length - 1;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (list[mid] === 0) r = mid;
      else l = mid + 1;
    }
    if(list[l]===1)return list.length
    return l;
  }
}
console.log(
  kWeakestRows(
    [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
    ],
    5
  )
);

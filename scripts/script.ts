import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
  3
2  4
1  n   
 */
function nthSuperUglyNumber(n: number, primes: number[]): number {
  const len = primes.length;
  const pos = new Array(len).fill(0);
  const list: number[] = [1];
  let val = 1;
  for (let i = 1; i < n; i++) {
    val = Math.min(...pos.map((v, i) => list[v] * primes[i]));
    for (let i = 0; i < len; i++) if (list[pos[i]] * primes[i] === val) pos[i]++;
    list.push(val);
  }
  return val;
}
console.log(nthSuperUglyNumber(1, [2, 7, 13, 19]));

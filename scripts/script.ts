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
function getNext(pattern: string) {
  const next: number[] = [-1];
  for (let i = 1, j = -1; pattern[i]; i++) {
    while (j !== -1 && pattern[j + 1] !== pattern[i]) j = next[j];
    if (pattern[j + 1] === pattern[i]) j++;
    next[i] = j;
    log({
      i,
      j,
      next,
      l: pattern.length,
    });
  }
  return next;
}
log([getNext('aecaaaeua')]);

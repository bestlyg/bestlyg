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
function getNext(str: string) {
  const next: number[] = [-1];
  for (let i = 1, j = -1; str[i]; i++) {
    while (j !== -1 && str[j + 1] !== str[i]) j = next[j];
    if (str[j + 1] === str[i]) j++;
    next[i] = j;
  }
  return next;
}
function repeatedSubstringPattern(s: string): boolean {
  const next = getNext(s);
  log({ next });
  for (let i = 1, n = s.length; i < n; i++) {
    log({
      i,
      next,
      nextI: next[i],
      head: s.substring(0, n - next[i]),
      end: s.substring(next[i]),
    });
    if (next[i] > 0 && s.substring(0, n - next[i]) === s.substring(next[i])) return true;
  }
  return false;
}
log([repeatedSubstringPattern('abcabcabcabca')]);

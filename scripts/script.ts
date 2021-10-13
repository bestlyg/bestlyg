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
  const next = [-1];
  for (let i = 1, j = -1; str[i]; i++) {
    while (j !== -1 && str[i] !== str[j + 1]) j = next[j];
    if (str[i] === str[j + 1]) j++;
    next[i] = j;
  }
  return next;
}
function longestPrefix(s: string): string {
  const next = getNext(s);
  const last = next[s.length - 1];
  return last === -1 ? '' : s.substring(0, last + 1);
}
log([
  longestPrefix('level'),
  longestPrefix('leetcodeleet'),
  longestPrefix('bba'),
  longestPrefix('acccbaaacccbaac'),
  longestPrefix('ccabcbbacbcbbacccabaabcccabcbbacbcbbac'),
]);

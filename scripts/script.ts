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
function findRepeatedDnaSequences(s: string): string[] {
  const set = new Set<string>();
  let str = s.substr(0, 10);
  set.add(str);
  const ans = new Set<string>();
  for (let i = 10, l = s.length; i < l; i++) {
    str = str.substring(1) + s[i];
    if (set.has(str)) ans.add(str);
    set.add(str);
  }
  return [...ans];
}
log([findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT')]);

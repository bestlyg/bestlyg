import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, map, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function countAndSay(n: number): string {
  return findNext();
  function findNext(str = '1', level = n): string {
    if (level === 1) return str;
    let next = '';
    for (let i = 0, l = str.length; i < l; i++) {
      const ch = str[i];
      let cnt = 1;
      while (i < l - 1 && str[i + 1] === ch) {
        i++;
        cnt++;
      }
      next += cnt + ch;
    }
    return findNext(next, level - 1);
  }
}
log(new Array(5).fill(0).map((_, i) => countAndSay(i + 1)));

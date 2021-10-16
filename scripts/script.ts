import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, map, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap, Trie } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function intToRoman(num: number): string {
  let ans = '';
  const list: { val: number; template: [string, string, string] }[] = [
    {
      val: 1000,
      template: ['M', 'M', 'M'],
    },
    {
      val: 100,
      template: ['M', 'D', 'C'],
    },
    {
      val: 10,
      template: ['C', 'L', 'X'],
    },
    {
      val: 1,
      template: ['X', 'V', 'I'],
    },
  ];
  for (const { val, template } of list) {
    if (num >= val) {
      ans += createStr(Math.floor(num / val), ...template);
      num %= val;
    }
  }
  return ans;
  function createStr(num: number, hight: string, mid: string, low: string) {
    if (num <= 3) return low.repeat(num);
    else if (num <= 5) return low.repeat(5 - num) + mid;
    else if (num <= 8) return mid + low.repeat(num - 5);
    else return low + hight;
  }
}
log([intToRoman(1994)]);

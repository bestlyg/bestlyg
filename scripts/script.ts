import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function repeat(len: number) {
  return ''.padEnd(len, ' ');
}
function fullJustify(words: string[], maxWidth: number): string[] {
  let idx = 0;
  const ans: string[] = [];
  const n = words.length;
  while (idx < n) {
    let len = 0;
    const list: string[] = [];
    while (idx < n && len + words[idx].length <= maxWidth) {
      const str = words[idx];
      len += str.length + 1;
      list.push(str);
      idx++;
    }
    if (idx === n) {
      ans.push(list.join(' ').padEnd(maxWidth, ' '));
    } else if (list.length === 1) {
      ans.push(list[0].padEnd(maxWidth, ' '));
    } else {
      const strlen = list.join('').length;
      let empty = maxWidth - strlen;
      const emptyList: number[] = new Array(list.length - 1).fill(0);
      for (let i = 0; empty !== 0; i = (i + 1) % (list.length - 1)) {
        emptyList[i]++;
        empty--;
      }
      let str = '';
      for (let i = 0; i < list.length; i++) {
        str += list[i] + repeat(emptyList.shift()!);
      }
      ans.push(str);
    }
  }
  return ans;
}
console.log(fullJustify(['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa'], 16));

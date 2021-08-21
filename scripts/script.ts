import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function compress(chars: string[]): number {
  let pos = 0;
  const n = chars.length;
  for (let i = 0; i < n; ) {
    console.log(i);
    const c = chars[i];
    let count = 1;
    while (i + count < n && chars[i + count] === c) count++;
    i += count;
    chars[pos++] = c;
    if (count > 1) {
      let countStr = '';
      while (count) {
        countStr = (count % 10) + countStr;
        count = ~~(count / 10);
      }
      for (const c of countStr) chars[pos++] = c;
    }
  }
  console.log(chars);

  return pos;
}
console.log(compress(['a', 'a', 'b', 'b', 'c', 'c', 'c']));

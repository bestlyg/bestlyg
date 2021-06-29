import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function convertToTitle(columnNumber: number): string {
  let ans = '';
  const getChar = (num: number) => String.fromCodePoint(num + 65);
  while (columnNumber-- !== 0) {
    ans = getChar(columnNumber % 26) + ans;
    columnNumber = ~~(columnNumber / 26);
  }
  return ans;
}
console.log(convertToTitle(702));

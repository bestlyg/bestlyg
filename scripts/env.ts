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
function frequencySort(s: string): string {
  return Object.entries(
    s.split('').reduce<Record<string, number>>((map, c) => {
      map[c] = (map[c] ?? 0) + 1;
      return map;
    }, {})
  )
    .sort(([, a], [, b]) => b - a)
    .map(([k, v]) => k.repeat(v))
    .join('');
}

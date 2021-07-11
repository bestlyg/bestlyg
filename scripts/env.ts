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
function hIndex(citations: number[]): number {
  if (citations.every(v => v === 0)) return 0;
  const max = Math.max(...citations);
  const arr = new Array(max + 1).fill(0);
  citations.forEach(num => arr[num]++);
  let sum = 0;
  let ans = 0;
  for (let num = max; num >= 0; num--) {
    const count = arr[num];
    if (count === 0) continue;
    ans = Math.max(ans, Math.min((sum += count), num));
  }
  return ans;
}
console.log(hIndex([2, 2, 2]));

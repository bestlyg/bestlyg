import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function isPowerOfTwo(n: number): boolean {
  if (n < 0) return false;
  let ans = 0;
  while (n) {
    if (n & 1) ans++;
    n >>= 1;
  }
  return ans === 1;
}

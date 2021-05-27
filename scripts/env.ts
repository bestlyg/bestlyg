import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function hammingDistance(x: number, y: number): number {
  const newVal = x ^ y;
  let ans = 0;
  for (let i = 0; i <= 31; i++) if ((newVal >> i) & 1) ans++;
  return ans;
}

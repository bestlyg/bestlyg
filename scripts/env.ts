import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function xorGame(nums: number[]): boolean {
  return !(nums.length & 1) ? true : nums.reduce((total, cur) => total ^ cur, 0) === 0;
}
console.log(xorGame([1, 1, 2]));

import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 2 3 4 5 6 7 8 9 10



 */
function findTargetSumWays(nums: number[], target: number): number {
  const len = nums.length;
  const ans: number[] = [];
  let val = 0;
  const findNext = (index = 0): void => {
    if (index === len) {
      ans.push(val);
      return;
    }
    val += nums[index];
    findNext(index + 1);
    val -= nums[index];
    val -= nums[index];
    findNext(index + 1);
    val += nums[index];
  };
  findNext();
  return ans.filter(v => v === target).length;
}
console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));

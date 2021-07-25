import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const ans: number[][] = [];
  dfs();
  return ans;
  function dfs(index = 0, value = 0, list: number[] = []) {
    if (value >= target || index === candidates.length) {
      value === target && ans.push([...list]);
      return;
    }
    const candy = candidates[index];
    list.push(candy);
    dfs(index, value + candy, list);
    list.pop();
    dfs(index + 1, value, list);
  }
}
console.log(combinationSum([2, 3, 6, 7], 7));

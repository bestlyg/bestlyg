import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */
function pathInZigZagTree(label: number): number[] {
  const list: number[] = [];
  let max = 1;
  while (label >= max) list.push((max <<= 1));
  const ans: number[] = [];
  dfs(label);
  return ans;
  function find(label: number): {
    maxLabel: number;
    prevMin: number;
  } {
    for (let i = 0; i < list.length; i++) {
      if (list[i] > label)
        return {
          maxLabel: list[i] - 1,
          prevMin: list[i - 2] ?? 1,
        };
    }
    return {
      maxLabel: -1,
      prevMin: -1,
    };
  }
  function dfs(label: number): void {
    if (label === 1) {
      ans.unshift(label);
      return;
    }
    ans.unshift(label);
    const { maxLabel, prevMin } = find(label);
    let i = maxLabel;
    let parent = prevMin;
    while (i > label) {
      i--;
      if ((i & 1) !== 0) parent++;
    }
    dfs(parent);
  }
}
console.log(pathInZigZagTree(16));

import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function numRescueBoats(people: number[], limit: number): number {
  people.sort((a, b) => a - b);
  let ans = 0;
  let l = 0;
  let r = people.length - 1;
  while (l < r) {
    if (people[r] + people[l] <= limit) l++;
    r--;
    ans++;
  }
  if (l === r) ans++;
  return ans;
}
console.log(numRescueBoats([3, 2, 2, 1], 3));

import { structures } from './utils';
import { RBTree2 } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

const tree = new RBTree2<number>((t1, t2) => t1 - t2);
[
  44, 20, 70, 64, 36, 69, 15, 99, 66, 2, 15, 44, 83, 21, 30, 57, 70, 2, 24, 29, 77, 85, 93, 15, 67,
  54, 42, 32, 41, 34, 62, 80, 9, 30,
].forEach(v => {
  // console.log(`=======================【add:${v}】`);
  tree.add(v);
  // console.log(tree.print());
});
console.log(tree.print());
[
  44, 32, 34, 41, 83, 85, 64, 36, 69, 15, 99, 66, 2, 15, 44, 83, 21, 30, 57, 70, 2, 24, 29, 77, 85,
  93, 15, 67, 69, 15, 99, 66, 2, 15, 44, 83, 21, 30, 57, 70, 2, 24, 29, 77, 85, 93, 15, 67, 54, 42,
  32, 41, 34, 62, 80, 9, 30,
].forEach(v => {
  // console.log(`=======================【rm:${v}】`);
  tree.remove(v);
  // console.log(tree.print());
});
function balancedStringSplit(s: string): number {
  let r = 0;
  let l = 0;
  let ans = 0;
  for (const c of s) {
    if (c === 'R') r++;
    if (c === 'L') l++;
    if (r === l) {
      ans++;
      r = l = 0;
    }
  }
  return ans;
}

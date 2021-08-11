import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
  3
2  4
1  n   
 */
function numberOfArithmeticSlices(nums: number[]): number {
  const map = new Map<number, Map<number, number>>(
    nums.map((_, i) => [i, new Map<number, number>()])
  );
  const n = nums.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    for (let j = 0; j < i; j++) {
      const v = num - nums[j];
      const c = map.get(j)!.get(v) ?? 0;
      ans += c;
      map.get(i)!.set(v, (map.get(i)!.get(v) ?? 0) + c + 1);
    }
  }
  return ans;
}

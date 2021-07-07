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
function countPairs(deliciousness: number[]): number {
  const MOD = 10 ** 9 + 7;
  const LIST_2: number[] = [];
  for (let i = 1, max = 2 ** 21; i <= max; i <<= 1) LIST_2.push(i);
  const map = new Map<number, number>();
  for (const num of deliciousness) map.set(num, (map.get(num) ?? 0) + 1);
  let ans = 0;
  for (const num of deliciousness) {
    for (const num2 of LIST_2) {
      if (num2 >= num) {
        if (num * 2 === num2) {
          ans = (ans + Math.max(map.get(num)! - 1, 0)) % MOD;
        } else {
          ans = (ans + (map.get(num2 - num) ?? 0)) % MOD;
        }
      }
    }
  }
  return ans;
}
console.log(countPairs([1, 3, 5, 7, 9]));

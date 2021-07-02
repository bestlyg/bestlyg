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
function maxIceCream(costs: number[], coins: number): number {
  costs.sort((a, b) => a - b);
  let ans = 0;
  for (const cost of costs) {
    if (coins >= cost) {
      ans++;
      coins -= cost;
    } else break;
  }
  return ans;
}
console.log(maxIceCream([1, 3, 2, 4, 1], 7));

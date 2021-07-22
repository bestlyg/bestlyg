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
function findRadius(houses: number[], heaters: number[]): number {
  heaters.sort((a, b) => a - b);
  let ans = 0;
  return ans;
  function bs(house: number) {
    let l = 0;
    let r = heaters.length;
    while (l <= r) {
      
    }
  }
}

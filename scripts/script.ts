import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*        

 */
function search(nums: number[], target: number): boolean {
  let l = 0;
  let r = nums.length - 1;
  if (nums[l] === target || nums[r] === target) return true;
  while (l < r) {
    while (l < r && nums[l] !== target && nums[l] === nums[r]) {
      l++;
      r--;
    }
    if (nums[l] === target || nums[r] === target) return true;
    const mid = (r + l) >> 1;
    const midNum = nums[mid];
    if (midNum === target) return true;
    if (midNum <= nums[r]) {
      if (midNum <= target && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    } else {
      if (nums[l] <= target && target <= midNum) r = mid - 1;
      else l = mid + 1;
    }
  }
  return false;
}
console.log(search([1, 0, 1, 1, 1], 0));

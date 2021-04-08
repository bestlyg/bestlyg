import { structures } from '../utils';

type ListNode = structures.ListNode;
type TreeNode = structures.TreeNode;
type Heap = structures.Heap;
type UnionFind = structures.UnionFind;
const { ListNode, TreeNode, UnionFind, Heap } = structures;

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = ~~((left + right) / 2);
    if (nums[mid] < nums[right]) right = mid;
    else left = mid + 1;
  }
  return nums[left];
}
console.log(findMin([3, 4, 5, 1, 2, 3, 4]));

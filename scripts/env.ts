import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function maxSlidingWindow(nums: number[], k: number): number[] {
  const list: number[] = [];
  if (k === 0) return list;
  const ans: number[] = [];
  const len = nums.length;
  let index = 0;
  while (index < len) {
    while (list.length !== 0 && list[0] + k <= index) list.shift();
    const num = nums[index];
    while (list.length !== 0 && nums[list[list.length - 1]] < num) list.pop();
    list.push(index++);
    index >= k && ans.push(nums[list[0]]);
  }
  return ans;
}
console.log(maxSlidingWindow([9, 10, 9, -7, -4, -8, 2, -6], 5));
// const list = [1, 3, -1, -3, 5, 3, 6, 7].sort((a, b) => a - b);
// console.log(list);
// const findIndex = (num: number, l = 0, r = 3 - 1) => {
//   if (l > r) return -1;
//   const mid = (l + r) >> 1;
//   const midNum = list[mid];
//   if (midNum < num) return findIndex(num, mid + 1, r);
//   else if (midNum > num) return findIndex(num, l, mid - 1);
//   else return mid;
// };
// console.log(findIndex(1));

import { structures } from './utils';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
function shipWithinDays(weights: number[], D: number): number {
  let left = Math.max(...weights);
  let right = weights.reduce((total, cur) => total + cur, 0);
  while (left < right) {
    const mid = (left + right) >> 1;
    let curWeight = 0;
    let curDay = 1;
    for (const weight of weights) {
      if (curWeight + weight > mid) {
        curWeight = 0;
        curDay++;
      }
      curWeight += weight;
    }
    if (curDay > D) left++;
    else right = mid;
  }
  return left;
}
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

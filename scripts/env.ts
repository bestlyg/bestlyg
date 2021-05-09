import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function minDays(bloomDay: number[], m: number, k: number): number {
  const n = bloomDay.length;
  const minCount = m * k;
  if (n < minCount) return -1;
  if (k === 1) return bloomDay.sort((a, b) => a - b)[m - 1];
  const check = (day: number): boolean => {
    let count = 0;
    let flower = 0;
    for (let i = 0; i < n && count < m; i++) {
      if (bloomDay[i] <= day) {
        if (++flower === k) {
          flower = 0;
          count++;
        }
      } else {
        flower = 0;
      }
    }
    return count >= m;
  };
  let low = 0;
  let high = Math.max(...bloomDay);
  while (low < high) {
    const midDay = (low + high) >> 1;
    if (check(midDay)) high = midDay;
    else low = midDay + 1;
  }
  return low;
}
console.log(minDays([30, 49, 11, 66, 54, 22, 2, 57, 35], 3, 3));
console.log(minDays([7, 7, 7, 7, 12, 7, 7], 2, 3));
console.log(minDays([1, 10, 2, 9, 3, 8, 4, 7, 5, 6], 4, 2));

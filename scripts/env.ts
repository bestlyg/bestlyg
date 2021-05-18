import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
function countTriplets(arr: number[]): number {
  const len = arr.length;
  if (len === 1) return 0;
  let ans = 0;
  const prefixSumList: number[] = [ans, ...arr.map(v => (ans ^= v))];
  ans = 0;
  for (let k = 1; k < len; k++) {
    for (let i = 0; i < k; i++) {
      if (prefixSumList[k + 1] === prefixSumList[i]) ans += k - i;
    }
  }
  return ans;
}
console.log(countTriplets([2, 3, 1, 6, 7]));
console.log(countTriplets([1, 1, 1, 1, 1]));

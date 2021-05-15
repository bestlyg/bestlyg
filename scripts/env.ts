import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
function romanToInt(s: string): number {
  let ans = 0;
  const scoreCache: Record<string, number> = {
    M: 1000,
    D: 500,
    L: 50,
    V: 5,
  };
  const specCache: Record<string, [string, string, number]> = {
    C: ['D', 'M', 100],
    X: ['L', 'C', 10],
    I: ['V', 'X', 1],
  };
  for (let i = 0, l = s.length; i < l; i++) {
    const c = s[i];
    const data = specCache[c];
    if (data) {
      const [c1, c2, num] = data;
      if (s[i + 1] === c1) {
        i++;
        ans += 4 * num;
      } else if (s[i + 1] === c2) {
        i++;
        ans += 9 * num;
      } else {
        ans += 1 * num;
      }
    } else ans += scoreCache[c];
  }
  return ans;
}

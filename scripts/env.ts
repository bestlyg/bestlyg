import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
const config: Map<number, Map<number, string>> = new Map([
  [
    100,
    new Map([
      [1, 'C'],
      [5, 'D'],
      [10, 'M'],
    ]),
  ],
  [
    10,
    new Map([
      [1, 'X'],
      [5, 'L'],
      [10, 'C'],
    ]),
  ],
  [
    1,
    new Map([
      [1, 'I'],
      [5, 'V'],
      [10, 'X'],
    ]),
  ],
]);
function intToRoman(num: number): string {
  let ans = '';
  if (num >= 1000) {
    ans += 'M'.repeat(~~(num / 1000));
    num = num % 1000;
  }
  for (const [val, map] of config) {
    if (num < val) continue;
    const c1 = map.get(1)!;
    const c5 = map.get(5)!;
    const c10 = map.get(10)!;
    const c = ~~(num / val);
    num = num % val;
    if (c === 9) ans += c1 + c10;
    else if (c >= 5) ans += c5 + c1.repeat(c - 5);
    else if (c === 4) ans += c1 + c5;
    else ans += c1.repeat(c);
  }
  return ans;
}

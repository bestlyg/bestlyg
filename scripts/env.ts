import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
class Trie {
  /** 左 0  */
  left: Trie | null = null;
  /** 右 1  */
  right: Trie | null = null;
}
function findMaximumXOR(nums: number[]): number {
  const len = nums.length;
  if (len === 1) return 0;
  const root = new Trie();
  let ans = -Infinity;
  const add = (num: number) => {
    let trie = root;
    for (let i = 30; i >= 0; i--) {
      const v = (num >> i) & 1;
      if (v === 1) {
        trie = trie.right ?? (trie.right = new Trie());
      } else {
        trie = trie.left ?? (trie.left = new Trie());
      }
    }
  };
  const check = (num: number): number => {
    let trie = root;
    let xorNum = 0;
    for (let i = 30; i >= 0; i--) {
      const v = (num >> i) & 1;
      if (v === 1) {
        trie = trie.left ?? trie.right!;
        xorNum <<= 1;
        if (trie.left) xorNum++;
      } else {
        trie = trie.right ?? trie.left!;
        xorNum <<= 1;
        if (trie.right) xorNum++;
      }
    }
    return xorNum;
  };
  for (let i = 1; i < len; i++) {
    add(nums[i - 1]);
    ans = Math.max(ans, check(nums[i]));
  }
  return ans;
}
console.log(findMaximumXOR([20, 12, 29, 76, 94, 65, 95, 33, 79, 80, 57, 78]));
/**
 
[20,12,29,76,94,65,95,33,79,80,57,78]
   if (v === 1) {
        trie = trie.left ?? trie.right!;
        xorNum <<= 1;
        if (trie.left) xorNum++;
      } else {
        trie = trie.right ?? trie.left!;
        xorNum <<= 1;
        if (trie.right) xorNum++;
      }
 */
// function findMaximumXOR1(nums: number[]): number {
//   let ans = -Infinity;
//   nums.forEach(v1 =>
//     nums.forEach(v2 => {
//       const v = Math.max(ans, v1 ^ v2);
//       console.log(`max:${v},ans=${ans},v1=${v1},v2=${v2}`);
//       ans = v;
//     })
//   );
//   return ans;
// }

// console.log(findMaximumXOR1([20, 12, 29, 76, 94, 65, 95, 33, 79, 80, 57, 78]));
// console.log((94).toString(2));
// console.log((95).toString(2));
// console.log((33).toString(2));
/**
1011110
1011111
0100001
 */

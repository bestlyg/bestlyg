import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { min, random } from 'lodash';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
function singleNumber(nums: number[]): number {
  let a = 0;
  let b = 0;
  for (const num of nums) {
    b = ~a & (b ^ num);
    a = ~b & (a ^ num);
  }
  return b;
}
console.log(singleNumber([2, 2, 2, 3]));

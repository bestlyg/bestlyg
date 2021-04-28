import { structures } from './utils';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
function judgeSquareSum(c: number): boolean {
  let num1 = 0;
  let num2 = ~~Math.sqrt(c) + 1;
  while (num1 <= num2) {
    const sum = num1 ** 2 + num2 ** 2;
    if (sum > c) num2--;
    else if (sum < c) num1++;
    else return true;
  }
  return false;
}

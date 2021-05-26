import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function reverseParentheses(s: string): string {
  const stack: string[] = [];
  for (const c of s) {
    if (c === ')') {
      let str = '';
      while (stack[stack.length - 1] !== '(') str += stack.pop()!;
      stack.pop();
      stack.push(str);
    } else stack.push(c);
  }
  return stack.join('');
}

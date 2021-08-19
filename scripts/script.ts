import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function reverseVowels(s: string): string {
  const set = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let l = 0;
  let r = s.length - 1;
  while (l <= r) {
    if (set.has(s[r]) && set.has(s[l])) {
      s = s.substring(0, l) + s[r] + s.substring(l + 1, r) + s[l] + s.substring(r + 1);
      l++;
      r--;
    }
    if (!set.has(s[l])) l++;
    if (!set.has(s[r])) r--;
  }
  return s;
}
console.log(reverseVowels('a.'));

import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function maxLength(arr: string[]): number {
  const masks = arr
    .map(s => {
      if (s === '') return -1;
      let mask = 0;
      for (const c of s) {
        const num = c.codePointAt(0)!;
        if ((mask >> num) & 1) return -1;
        mask |= 1 << num;
      }
      return mask;
    })
    .filter(num => num !== -1);
  let ans = 0;
  const masksLen = masks.length;
  const dfs = (index = 0, num = 0) => {
    if (index === masksLen) {
      ans = Math.max(ans, num.toString(2).split('0').join('').length);
      return;
    }
    if ((num & masks[index]) === 0) dfs(index + 1, num | masks[index]);
    dfs(index + 1, num);
  };
  dfs();
  return ans;
}
console.log(maxLength(['cha', 'r', 'act', 'ers']));

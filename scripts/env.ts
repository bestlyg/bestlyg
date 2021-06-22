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

function permutation(s: string): string[] {
  const set = new Set<string>();
  const list = new Set<string>();
  const format = (curStr: string, waitStr: string) => `${curStr}::${waitStr}`;
  const dfs = (curStr: string = '', waitStr: string = s) => {
    if (waitStr.length === 1) {
      list.add(curStr + waitStr);
      return;
    }
    if (set.has(format(curStr, waitStr))) return;
    for (let i = 0, l = waitStr.length; i < l; i++) {
      const newCurStr = curStr + waitStr[i];
      const newWaitStr = waitStr.substring(0, i) + waitStr.substring(i + 1);
      dfs(newCurStr, newWaitStr);
      set.add(format(curStr + waitStr[i], newWaitStr));
    }
  };
  dfs();
  return [...list];
}
console.log(permutation('abc'));

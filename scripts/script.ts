import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function groupAnagrams(strs: string[]): string[][] {
  const map: Record<string, string[]> = {};
  const getKey = (str: string) => {
    const cache: Record<string, number> = {};
    for (const c of str) cache[c] = (cache[c] ?? 0) + 1;
    return Object.entries(cache)
      .sort(([k1], [k2]) => k1.codePointAt(0)! - k2.codePointAt(0)!)
      .map(([k, v]) => k + v)
      .join(':');
  };
  for (const str of strs) {
    const key = getKey(str);
    let arr = map[key];
    if (!arr) map[key] = arr = [];
    arr.push(str);
  }
  return Object.values(map);
}

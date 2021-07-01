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
function numWays(n: number, relation: number[][], k: number): number {
  const nextPartnerMap = new Map<number, Set<number>>();
  for (const [cur, next] of relation) {
    let set = nextPartnerMap.get(cur);
    if (!set) nextPartnerMap.set(cur, (set = new Set()));
    set.add(next);
  }
  let list = [0];
  while (k--) {
    list = list
      .map(item => (nextPartnerMap.has(item) ? [...nextPartnerMap.get(item)!] : []))
      .flat();
  }
  return list.filter(v => v === n - 1).length;
}

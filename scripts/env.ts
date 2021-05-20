import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function topKFrequent(words: string[], k: number): string[] {
  const map: Record<string, number> = {};
  for (const word of words) map[word] = (map[word] ?? 0) + 1;
  const chartToNumber = (char: string) => char.codePointAt(0)! - 'a'.codePointAt(0)!;
  const heap = new Heap<[string, number]>(([k1, v1], [k2, v2]) => {
    if (v1 !== v2) return v1 - v2;
    let i1 = 0;
    const end1 = k1.length;
    let i2 = 0;
    const end2 = k2.length;
    for (; i1 < end1 && i2 < end2; i1++, i2++)
      if (k1[i1] !== k2[i2]) return chartToNumber(k2[i2]) - chartToNumber(k1[i1]);
    if (i1 === end1) return 1;
    else if (i2 === end2) return -1;
    else return 0;
  });
  for (const data of Object.entries(map)) heap.add(data);
  const ans: string[] = [];
  while (heap.size !== 0 && k--) ans.push(heap.remove()[0]);
  return ans;
}
console.log(topKFrequent(['a', 'aa', 'aaa'], 1));

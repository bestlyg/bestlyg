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
function displayTable(orders: string[][]): string[][] {
  const foodSet = new Set<string>();
  const tables: Map<number, Map<string, number>> = new Map();
  for (const [, table, foodName] of orders) {
    const tableNumber = +table;
    let map = tables.get(tableNumber);
    if (!map) tables.set(tableNumber, (map = new Map()));
    map.set(foodName, (map.get(foodName) ?? 0) + 1);
    foodSet.add(foodName);
  }
  const title = [
    'Table',
    ...[...foodSet].sort((s1, s2) => {
      const len1 = s1.length;
      const len2 = s2.length;
      let i = 0;
      while (i < Math.min(len1, len2)) {
        const code1 = s1.codePointAt(i)!;
        const code2 = s2.codePointAt(i)!;
        if (code1 !== code2) return code1 - code2;
        else i++;
      }
      if (i === len1) return -1;
      else if (i === len2) return 1;
      else return 0;
    }),
  ];
  const data: number[][] = [];
  for (const [table, map] of tables.entries()) {
    const item: number[] = [table];
    for (let i = 1, l = title.length; i <= l; i++) item[i] = map.get(title[i]) ?? 0;
    data.push(item);
  }
  return [title, ...data.sort(([t1], [t2]) => t1 - t2).map(v => v.map(v => v + ''))];
}

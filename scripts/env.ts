import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function canEat(candiesCount: number[], queries: number[][]): boolean[] {
  const sum = candiesCount.reduce<number[]>((list, cur, i, arr) => {
    list[i] = (i === 0 ? 0 : list[i - 1]) + cur;
    return list;
  }, []);
  const check = ([type, day, count]: number[]): boolean => {
    const x1 = day + 1;
    const y1 = (day + 1) * count;
    const x2 = type === 0 ? 1 : sum[type - 1] + 1;
    const y2 = sum[type];
    return !(x1 > y2 || y1 < x2);
  };
  return queries.map(check);
}

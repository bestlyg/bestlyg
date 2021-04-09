import { structures } from '../utils';

type ListNode = structures.ListNode;
type TreeNode = structures.TreeNode;
type Heap = structures.Heap;
type UnionFind = structures.UnionFind;
const { ListNode, TreeNode, UnionFind, Heap } = structures;

function getLeastNumbers(arr: number[], k: number): number[] {
  const ans: number[] = [];
  const heap = new Heap((num1, num2) => num2 - num1);
  arr.forEach(v => heap.add(v));
  while (--k) ans.push(heap.remove());
  return ans;
}

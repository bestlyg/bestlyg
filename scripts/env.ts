import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

class Trie {
  left: Trie | null = null;
  right: Trie | null = null;
  val: number | null = null;
}
function maximizeXor(nums: number[], queries: number[][]): number[] {
  const root = new Trie();
  const add = (num: number) => {
    let node = root;
    for (let i = 31; i >= 0; i--) {
      const val = (num >> i) & 1;
      if (val === 1) node = node.right ?? (node.right = new Trie());
      else node = node.left ?? (node.left = new Trie());
      node.val = num;
    }
  };
  const select = (num: number): number => {
    let node = root;
    for (let i = 31; i >= 0; i--) {
      const val = (num >> i) & 1;
      if (val === 1) node = node.left ?? node.right!;
      else node = node.right ?? node.left!;
    }
    return node.val!;
  };
  nums.sort((a, b) => a - b);
  const queryMap = new Map<number[], number>();
  queries.forEach((v, i) => queryMap.set(v, i));
  queries.sort(([, a], [, b]) => a - b);
  const ans: number[] = [];
  for (const query of queries) {
    const [x, m] = query;
    while (nums.length > 0 && nums[0] <= m) add(nums.shift()!);
    const index = queryMap.get(query)!;
    ans[index] = root.left === null && root.right === null ? -1 : x ^ select(x);
  }
  return ans;
}
console.log(
  maximizeXor(
    [0, 1, 2, 3, 4],
    [
      [3, 1],
      [1, 3],
      [5, 6],
    ]
  )
);

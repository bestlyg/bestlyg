import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
const {
  TreeNode,
  UnionFind,
  ListNode,
  Heap,
  // Trie, TrieNode
} = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

/*
 */
class FenwickTree {
  arr: number[];
  constructor(private n: number) {
    this.arr = new Array(n + 1).fill(0);
  }
  add(idx: number, num: number): void {
    while (idx <= this.n) {
      this.arr[idx] += num;
      idx += this.lowbit(idx);
    }
  }
  at(idx: number): number {
    return this.query(idx) - this.query(idx - 1);
  }
  query(idx: number): number {
    let sum = 0;
    while (idx) {
      sum += this.arr[idx];
      idx -= this.lowbit(idx);
    }
    return sum;
  }
  private lowbit(num: number) {
    return num & -num;
  }
}
function processQueries(queries: number[], m: number): number[] {
  const n = queries.length;
  const tree = new FenwickTree(n + m);
  const idxList = new Array(m + 1).fill(0).map((_, i) => n + i);
  const ans: number[] = [];
  for (let i = 1; i <= m; i++) tree.add(i + n, 1);
  for (let i = 0; i < n; i++) {
    const query = queries[i];
    const idx = idxList[query];
    const cnt = tree.query(idx);
    ans.push(cnt - 1);
    tree.add(idx, -1);
    tree.add(n - i, 1);
    idxList[query] = n - i;
    log({ idx, cnt, ans, idxList, arr: tree.arr });
  }
  return ans;
}
log(processQueries([3, 1, 2, 1], 5));

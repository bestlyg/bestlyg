import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
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
const MAX_COUNT = 10;
const getIdx = (ch: string) => ch.codePointAt(0)! - '0'.codePointAt(0)!;
class TrieNode {
  end = false;
  children: TrieNode[] = new Array(MAX_COUNT);
  constructor(public val: string) {}
  getDictionary(): string[] {
    const ans: string[] = [];
    _dfs(this);
    return ans;
    function _dfs(node: TrieNode | null, str = ''): void {
      if (!node) return;
      str += node.val;
      if (node.end) ans.push(str);
      for (let i = 0; i < MAX_COUNT; i++) _dfs(node.children[i], str);
    }
  }
}
class Trie {
  root = new TrieNode('');
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      const idx = getIdx(ch);
      if (!node.children[idx]) node.children[idx] = new TrieNode(ch);
      node = node.children[idx];
    }
    node.end = true;
  }
  findNode(word: string): TrieNode | null {
    let node = this.root;
    for (const ch of word) {
      const idx = getIdx(ch);
      if (!node.children[idx]) return null;
      node = node.children[idx];
    }
    return node;
  }
  search(word: string): boolean {
    return !!this.findNode(word)?.end;
  }
  startsWith(prefix: string): boolean {
    return !!this.findNode(prefix);
  }
}
function findKthNumber(n: number, k: number): number {
  const trie = new Trie();
  for (let i = 1; i <= n; i++) trie.insert(i + '');
  console.log(trie.root);
  console.log(trie.root.getDictionary());
  return +trie.root.getDictionary()[k - 1];
}
// log([findKthNumber(13, 2)]);
function triangleNumber(nums: number[]): number {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  let ans = 0;
  for (let i1 = 0; i1 < n - 1; i1++) {
    const num1 = nums[i1];
    for (let i2 = i1 + 1; i2 < n - 1; i2++) {
      const num2 = nums[i2];
      let l = i2 + 1,
        r = n - 1,
        maxIdx = i2;
      while (l <= r) {
        const mid = (l + r) >> 1;
        if (num1 + num2 > nums[mid]) {
          maxIdx = mid;
          l = mid + 1;
        } else {
          r = mid - 1;
        }
      }
      ans += maxIdx - i2;
    }
  }
  return ans;
}
log([triangleNumber([2, 2, 3, 4])]);

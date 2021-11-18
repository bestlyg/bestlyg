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
6 abcw baz foo bar xtfn abcdef
 */
function findTilt(root: TreeNode | null): number {
  return dfs(root).tilt;
  function dfs(node: TreeNode | null): {
    sum: number;
    tilt: number;
  } {
    const ans = { sum: 0, tilt: 0, res: 0 };
    if (node === null) return ans;
    const left = dfs(node.left);
    const right = dfs(node.right);
    ans.tilt = Math.abs(left.sum - right.sum) + left.tilt + right.tilt;
    ans.sum = node.val + left.sum + right.sum;
    log({
      node: node.val,
      ...ans,
    });
    return ans;
  }
}
log([findTilt(TreeNode.factory([21, 7, 14, 1, 1, 2, 2, 3, 3]))]);

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
// 每一段具有相同位数的数字算一个区间
function findNthDigit(n: number): number {
  // 当前数字占几位
  let bit = 1;
  // 当前区间最大值
  let max = 9;
  // 当前区间最小值
  let min = 1;
  // 前区间占用位数
  let cnt = 0;
  // 判断n是否大于下一个区间数量，大于则移动至下一区间
  while (n > cnt + (max - Math.floor(max / 10)) * bit) {
    cnt += (max - Math.floor(max / 10)) * bit++;
    max = max * 10 + 9;
    min *= 10;
  }
  // 删除前一区间的量
  n -= cnt;
  // 计算当前区间中所指向的数字
  const num = Math.floor((n - 1) / bit) + min;
  return +num.toString()[(n - 1) % bit];
}
log([findNthDigit(1000), findNthDigit(1001), findNthDigit(1002), findNthDigit(1003)]);

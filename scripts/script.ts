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
function format(board: string): string {
  let flag = false;
  let n = board.length;
  do {
    flag = false;
    for (let i = 0; i < n - 1; i++) {
      const ball = board[i];
      let end = i;
      let cnt = 1;
      while (end < n - 1 && ball === board[end + 1]) {
        end++;
        cnt++;
      }
      if (cnt < 3) {
        i = end;
        continue;
      }
      board = board.substring(0, i) + board.substring(end + 1);
      n = board.length;
      flag = true;
    }
  } while (flag);
  return board;
}
function findMinStep(board: string, hand: string): number {
  const cache: Record<string, number> = {};
  const map: Record<string, number> = { R: 0, Y: 0, B: 0, G: 0, W: 0 };
  for (const ball of hand) map[ball]++;
  return dfs(board, 0, map);
  function dfs(board: string, cnt: number, map: Record<string, number>): number {
    if (cache[board]) return cache[board];
    if (board === '') return cnt;
    const n = board.length;
    const list = Object.entries(map)
      .filter(([, v]) => v > 0)
      .map(([k]) => k);
    let ans = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < list.length; j++) {
        const ball = list[j];
        map[ball]--;
        const nextBoard = board.substring(0, i) + ball + board.substring(i);
        const res = dfs(format(nextBoard), cnt + 1, map);
        if (res !== -1) ans = Math.min(ans, res);
        map[ball]++;
      }
    }
    return (cache[board] = ans === Infinity ? -1 : ans);
  }
}
log([findMinStep('RBYYBBRRB', 'YRBGB')]);

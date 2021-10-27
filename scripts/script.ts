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
const map: Record<string, string[]> = {};
function removeInvalidParentheses(s: string): string[] {
  if (map[s]) return map[s];
  const replaceStr = s.replace(new RegExp('[(]|[)]', 'g'), '');
  const leftList: number[] = [];
  const rightList: number[] = [];
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const ch = s[i];
    if (ch === '(') leftList.push(i);
    if (ch === ')') rightList.push(i);
  }
  if (leftList.length === 0 || rightList.length === 0) return [replaceStr];
  let max = replaceStr.length;
  const ans = new Set<string>(['', replaceStr]);
  for (const left of leftList) {
    let rightIdx = findRight(left);
    for (let rlen = rightList.length; rightIdx < rlen; rightIdx++) {
      const right = rightList[rightIdx];
      for (const s0 of removeInvalidParentheses(s.substring(0, left))) {
        for (const s1 of removeInvalidParentheses(s.substring(left + 1, right))) {
          for (const s2 of removeInvalidParentheses(s.substring(right + 1))) {
            const str = `${s0}(${s1})${s2}`;
            max = Math.max(max, str.length);
            ans.add(str);
          }
        }
      }
    }
  }
  return (map[s] = Array.from(ans).filter(v => v.length === max));
  function findRight(leftIdx: number) {
    let left = 0;
    let right = rightList.length - 1;
    if (rightList[right] < leftIdx) return Infinity;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (rightList[mid] >= leftIdx) right = mid;
      else left = mid + 1;
    }
    return left;
  }
}

import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common, sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';
import { ListNode } from './structures';

const ipv4Reg = /^[0-9]*$/;
/*
string alienOrder(vector<string>& words) {
  unordered_map<char, vector<char>> s;
  int n = words.size();
  for (int i = 1; i < n; i++) comp(words[i - 1], words[i], s);
  return order(s);
}
string order(unordered_map<char, vector<char>> &s) {

}
void comp(string &w1, string &w2, unordered_map<char, vector<char>> &s) {
  int n = min(w1.size(), w2.size());
  for (int i = 0; i < n; i++) {

  }
}
*/
class MyNode {
  next = new Set<MyNode>();
  parent = new Set<MyNode>();
  constructor(public val: string) {}
}
function alienOrder(words: string[]): string {
  const map = new Map<string, MyNode>();
  const n = words.length;
  let error = false;
  for (let i = 0; i < n; i++) {
    for (const ch of words[i]) {
      if (!map.has(ch)) map.set(ch, new MyNode(ch));
    }
    if (i >= 1) comp(i - 1, i);
    if (error) return '';
  }
  const q: MyNode[] = [];
  for (const node of map.values()) {
    if (node.parent.size === 0) q.push(node);
  }
  const set = new Set<MyNode>();
  let ans = '';
  while (q.length) {
    const node = q.shift()!;
    if (set.has(node)) continue;
    set.add(node);
    ans += node.val;
    for (const child of node.next) {
      child.parent.delete(node);
      if (child.parent.size === 0) {
        q.push(child);
      }
    }
  }
  if (ans.length !== map.size) return '';
  return ans;
  function comp(idx1: number, idx2: number) {
    const word1 = words[idx1];
    const word2 = words[idx2];
    const n = Math.min(word1.length, word2.length);
    for (let i = 0; i < n; i++) {
      if (word1[i] !== word2[i]) {
        const n1 = map.get(word1[i])!;
        const n2 = map.get(word2[i])!;
        n1.next.add(n2);
        n2.parent.add(n1);
        return;
      }
    }
    if (word1.length > word2.length) error = true;
  }
}

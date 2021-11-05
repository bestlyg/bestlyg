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
const getIdx = (ch: string) => ch.codePointAt(0)! - 'a'.codePointAt(0)!;
class TrieNode {
  end = false;
  children: TrieNode[] = [];
  constructor(public val: string) {}
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
  search(word: string): boolean {
    return this._search(word);
  }
  _search(word: string, node = this.root, idx = 0, err = 1): boolean {
    if (idx === word.length) return node.end && err === 0;
    const ch = word[idx];
    const chIdx = getIdx(ch);
    if (node.children[chIdx] && this._search(word, node.children[chIdx], idx + 1, err)) return true;
    if (err === 0) return false;
    for (const child of node.children) {
      if (child === node.children[chIdx]) continue;
      if (this._search(word, child, idx + 1, err - 1)) return true;
    }
    return false;
  }
}

class MagicDictionary {
  trie = new Trie();
  buildDict(dictionary: string[]): void {
    dictionary.forEach(word => this.trie.insert(word));
  }
  search(searchWord: string): boolean {
    return this.trie.search(searchWord);
  }
}
const obj = new MagicDictionary();
obj.buildDict(['hello', 'hallo', 'leetcode']);
log([obj.search('hello'), obj.search('leetco2e')]);
// ["MagicDictionary", "buildDict", "search", "search", "search", "search"]
// [[], [["hello","hallo","leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]

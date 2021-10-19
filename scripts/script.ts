import { structures, log } from './utils';
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { sequence } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap, Trie, TrieNode } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
type TrieNode = structures.TrieNode;

/*
 */
class WordDictionary {
  private trie = new Trie();
  addWord(word: string): void {
    this.trie.add(word);
  }
  search(word: string): boolean {
    return this._search(0, word, this.trie.root);
  }
  private _search(idx: number, word: string, node: TrieNode): boolean {
    const ch = word[idx];
    if (idx === word.length - 1) {
      if (ch === '.') return Array.from(node.children.values()).some(node => node.end);
      const lastNode = node.children.get(ch);
      return !!lastNode?.end;
    }
    if (ch === '.') {
      for (const nextNode of node.children.values()) {
        if (this._search(idx + 1, word, nextNode)) return true;
      }
      return false;
    }
    const nextNode = node.children.get(ch);
    if (!nextNode) return false;
    return this._search(idx + 1, word, nextNode);
  }
}
const wordDictionary = new WordDictionary();
// log([
//   wordDictionary.addWord('bad'),
//   wordDictionary.addWord('dad'),
//   wordDictionary.addWord('mad'),
//   wordDictionary.search('pad'), // return False
//   wordDictionary.search('bad'), // return True
//   wordDictionary.search('.ad'), // return True
//   wordDictionary.search('b..'), // return True
// ]);
log([
  wordDictionary.addWord('at'),
  wordDictionary.addWord('and'),
  wordDictionary.addWord('an'),
  wordDictionary.addWord('add'),
  wordDictionary.search('a'), // return False
  wordDictionary.search('.at'), // return True
  wordDictionary.addWord('bat'), // return True
  wordDictionary.search('.at'), // return True
  wordDictionary.search('an.'), // return True
  wordDictionary.search('a.d.'), // return True
  wordDictionary.search('b.'), // return True
  wordDictionary.search('a.d'), // return True
  wordDictionary.search('.'), // return True
]);

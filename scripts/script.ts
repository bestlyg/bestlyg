import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

interface ITrie {
  size: number;
  empty: boolean;
  add: (str: string) => void;
  remove: (str: string) => void;
  clear: () => void;
  contains: (str: string) => boolean;
  starsWith: (str: string) => boolean;
}
class TrieNode {
  end = false;
  children: Map<string, TrieNode> = new Map();
  constructor(public val: string) {}
}
class Trie implements ITrie {
  private _size = 0;
  get size() {
    return this._size;
  }
  get empty() {
    return this._size === 0;
  }
  private root = new TrieNode('');
  clear() {
    this.root = new TrieNode('');
    this._size = 0;
  }
  add(str: string) {
    return this._add(str);
  }
  private _add(str: string, node = this.root) {
    if (str.length === 0) {
      this.root.end = true;
      this._size++;
      return;
    }
    if (str.length === 1) {
      let endNode = node.children.get(str);
      if (!endNode) node.children.set(str, (endNode = new TrieNode(str)));
      if (!endNode.end) {
        endNode.end = true;
        this._size++;
      }
      return;
    }
    const first = str[0];
    let nextNode = node.children.get(first);
    if (!nextNode) node.children.set(first, (nextNode = new TrieNode(first)));
    const nextStr = str.substr(1);
    this._add(nextStr, nextNode);
  }
  contains(str: string) {
    const endNode = this.findEndNode(str);
    return endNode ? endNode.end : false;
  }
  remove(str: string) {
    const endNode = this.findEndNode(str);
    if (endNode && endNode.end) {
      endNode.end = false;
      this._size--;
    }
  }
  starsWith(str: string) {
    return this.findEndNode(str) !== null;
  }
  private findEndNode(str: string, node = this.root): TrieNode | null {
    if (str.length === 0) return this.root;
    if (str.length === 1) return node.children.get(str) ?? null;
    const first = str[0];
    let nextNode = node.children.get(first);
    if (!nextNode) return null;
    const nextStr = str.substr(1);
    return this.findEndNode(nextStr, nextNode);
  }
}
function findWords(board: string[][], words: string[]): string[] {
  const trie = new Trie();
  let maxWordLen = 0;
  words.forEach(word => {
    trie.add(word);
    maxWordLen = Math.max(maxWordLen, word.length);
  });
  const rowLen = board.length;
  const colLen = board[0].length;
  const ans = new Set<string>();
  const format = (row: number, col: number) => `${row}::${col}`;
  const set = new Set<string>();
  const starts: [number, number][] = [];
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (trie.starsWith(board[row][col])) starts.push([row, col]);
    }
  }
  starts.forEach(v => find(...v));
  return Array.from(ans);
  function find(row: number, col: number, str: string = ''): void {
    console.log(row, col, str);
    const formatStr = format(row, col);
    if (
      set.has(formatStr) ||
      str.length > maxWordLen ||
      ans.size === words.length ||
      row === -1 ||
      row === rowLen ||
      col === -1 ||
      col === colLen
    )
      return;
    str += board[row][col];
    if (trie.contains(str)) ans.add(str);
    set.add(formatStr);
    find(row, col - 1, str);
    find(row, col + 1, str);
    find(row - 1, col, str);
    find(row + 1, col, str);
    set.delete(formatStr);
  }
}
console.log(
  findWords(
    [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v'],
    ],
    ['oath', 'pea', 'eat', 'rain']
  )
);

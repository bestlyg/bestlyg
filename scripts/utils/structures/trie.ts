export interface ITrie {
  size: number;
  empty: boolean;
  add: (str: string) => void;
  remove: (str: string) => void;
  clear: () => void;
  contains: (str: string) => boolean;
  starsWith: (str: string) => boolean;
}
export class TrieNode {
  end = false;
  children: Map<string, TrieNode> = new Map();
  constructor(public val: string) {}
}
export class Trie implements ITrie {
  private _size = 0;
  get size() {
    return this._size;
  }
  get empty() {
    return this._size === 0;
  }
  private _root = new TrieNode('');
  get root() {
    return this._root;
  }
  clear() {
    this._root = new TrieNode('');
    this._size = 0;
  }
  add(str: string) {
    return this._add(str);
  }
  private _add(str: string, node = this._root) {
    if (str.length === 0) {
      this._root.end = true;
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
  private findEndNode(str: string, node = this._root): TrieNode | null {
    if (str.length === 0) return this._root;
    if (str.length === 1) return node.children.get(str) ?? null;
    const first = str[0];
    let nextNode = node.children.get(first);
    if (!nextNode) return null;
    const nextStr = str.substr(1);
    return this.findEndNode(nextStr, nextNode);
  }
}

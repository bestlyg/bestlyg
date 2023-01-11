export class TrieNode {
  end = false;
  children: TrieNode[] = [];
  constructor(public val: string) {}
}
export class Trie {
  root = new TrieNode('');
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      const idx = this.getIdx(ch);
      if (!node.children[idx]) node.children[idx] = new TrieNode(ch);
      node = node.children[idx];
    }
    node.end = true;
  }
  findNode(word: string): TrieNode | null {
    let node = this.root;
    for (const ch of word) {
      const idx = this.getIdx(ch);
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
  getIdx(ch: string) {
    return ch.codePointAt(0)! - 'a'.codePointAt(0)!;
  }
}

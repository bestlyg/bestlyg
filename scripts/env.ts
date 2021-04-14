class TrieNode {
  private children = new Map<string, TrieNode>();
  constructor(public char = '', public end = false) {}
  insert(word: string): void {
    if (word === '') {
      this.end = true;
      return;
    }
    const first = word[0];
    let nextTrieNode = this.children.get(first);
    if (!nextTrieNode)
      this.children.set(first, (nextTrieNode = new TrieNode(first, word.length === 1)));
    nextTrieNode.insert(word.substr(1));
  }
  search(word: string): boolean {
    if (word === '') return this.end;
    return !!this.children.get(word[0])?.search(word.substr(1));
  }
  startsWith(prefix: string): boolean {
    if (prefix.length === 1) return this.children.has(prefix);
    return !!this.children.get(prefix[0])?.startsWith(prefix.substr(1));
  }
}
class Trie {
  private children: Record<string, Trie> = {};
  constructor(public char = '', public end = false) {}
  insert(word: string): void {
    if (word === '') {
      this.end = true;
      return;
    }
    const first = word[0];
    let nextTrieNode = this.children[first];
    if (!nextTrieNode) this.children[first] = nextTrieNode = new Trie(first, word.length === 1);
    nextTrieNode.insert(word.substr(1));
  }
  search(word: string): boolean {
    if (word === '') return this.end;
    return !!this.children[word[0]]?.search(word.substr(1));
  }
  startsWith(prefix: string): boolean {
    if (prefix.length === 1) return !!this.children[prefix];
    return !!this.children[prefix[0]]?.startsWith(prefix.substr(1));
  }
}

const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'));
console.log(trie.search('app'));
console.log(trie.startsWith('app'));
trie.insert('app');
console.log(trie.search('app'));

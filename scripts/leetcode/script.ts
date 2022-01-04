import { log } from '../utils';
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
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

/*
6 abcw baz foo bar xtfn abcdef
 */
/*
function ex_gcd(
  a: number,
  b: number
): {
  ans: number;
  x: number;
  y: number;
} {
  if (b === 0) return { ans: a, x: 1, y: 0 };
  const res = ex_gcd(b, a % b);
  [res.x, res.y] = [res.y, res.x - Math.floor(a / b) * res.y];
  return res;
}
function phi(n: number) {
  let ans = n;
  for (let i = 2; i ** 2 < n; i++) {
    if (n % i === 0) ans = ans * (1 - 1 / i);
    while (n % i === 0) n /= i;
  }
  if (n !== 1) ans = ans * (1 - 1 / n);
  return ans;
}
function pow(x: bigint, y: bigint): bigint {
  let ans = 1n;
  while (y--) ans *= x;
  return ans;
}
function formual(a: number, b: number, c: number): string {
  const debug = (...args: any[]) => false && console.log(...args);
  const error = (str: string) => `ERROR : ${str}`;
  const { ans: gcd, x, y } = ex_gcd(a, b);
  if (gcd !== 1) return error('AB互质');
  if (c >= b) return error('c < b');
  debug(`phi(${b}) = ${phi(b)}`);
  debug(`gcd(${a}, ${b}) = gcd:${gcd}, x:${x}, y:${y}`);
  const formula2Str = (a: bigint, b: bigint, c: bigint, x: bigint) =>
    `${a} ^ ${x} mod ${b} === ${c}`;
  const a_big = BigInt(a);
  const b_big = BigInt(b);
  const c_big = BigInt(c);
  for (let x = 0n; x < phi(b); x++) {
    debug(formula2Str(a_big, b_big, pow(a_big, x) % b_big, x));
  }
  for (let x = 0n; x < phi(b); x++) {
    if (pow(a_big, x) % b_big === c_big) {
      return `${a} ^ ${x} mod ${b} === ${c}`;
    }
  }
  return error('NOT FOUND');
}
*/
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

function check(trie: Trie, word: string, init = true): boolean {
  if (!init && trie.search(word)) return true;
  for (let i = 0, n = word.length; i < n; i++) {
    if (trie.search(word.substring(0, i)) && check(trie, word.substring(i), false)) return true;
  }
  return false;
}
function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const trie = new Trie();
  return words
    .sort((w1, w2) => w1.length - w2.length)
    .filter(word => {
      if (!word) return false;
      if (check(trie, word)) return true;
      trie.insert(word);
      return false;
    });
}
log([
  findAllConcatenatedWordsInADict([
    'cat',
    'cats',
    'catsdogcats',
    'dog',
    'dogcatsdog',
    'hippopotamuses',
    'rat',
    'ratcatdogcat',
  ]),
  findAllConcatenatedWordsInADict(['a', 'b', 'ab', 'abc']),
]);

import { structures, log } from './utils';
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
6 abcw baz foo bar xtfn abcdef
 */
function ex_gcd(
  a: number,
  b: number
): {
  ans: number;
  x: number;
  y: number;
} {
  if (b === 0) {
    return {
      ans: a,
      x: 1,
      y: 0,
    };
  }
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
function comp(a: number, b: number, c: number): string {
  for (let x = 0; x < Number.MAX_SAFE_INTEGER; x++) {
    if (a ** x % b === c) return `${a} ^ ${x} mod ${b} === ${c}`;
  }
  return 'NOT FOUND';
}
// log(
//   [
//     ...[
//       [4, 6],
//       [12, 5],
//     ].map(([a, b]: [number, number]) => {
//       const { ans, x, y } = ex_gcd(a, b);
//       return `${a} * ${x} + ${b} * ${y} = ${ans}`;
//     }),
//     phi(7),
//     phi(12),
//     phi(24),
//     13 ** 6 % 7,
//     comp(999, 7, 2),
//   ],
//   { chunkCount: 1 }
// )
const MOD = 1337;
function pow(a: number, b: number) {
  let ans = 1;
  while (b--) ans = (ans * a) % MOD;
  return ans;
}
function superPow(a: number, b: number[]): number {
  let ans = 1;
  for (let i = 0; i < b.length; i++) {
    ans = (pow(ans, 10) * pow(a, b[i])) % MOD;
  }
  return ans;
}
log([superPow(2147483647, [2, 0, 0])]);

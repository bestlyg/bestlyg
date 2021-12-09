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
function validTicTacToe(board: string[]): boolean {
  let cntO = 0,
    cntX = 0,
    checkO = check('O'),
    checkX = check('X');
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const ch = board[i][j];
      if (ch === 'X') cntX++;
      else if (ch === 'O') cntO++;
    }
  }
  if (
    (cntO !== cntX && cntO !== cntX - 1) ||
    (checkO && checkX) ||
    (checkO && cntO !== cntX) ||
    (checkX && cntO !== cntX - 1)
  )
    return false;
  return true;
  function check(ch: string) {
    return (
      (board[0][0] === ch && board[0][1] === ch && board[0][2] === ch) ||
      (board[1][0] === ch && board[1][1] === ch && board[1][2] === ch) ||
      (board[2][0] === ch && board[1][2] === ch && board[2][2] === ch) ||
      (board[0][0] === ch && board[1][0] === ch && board[2][0] === ch) ||
      (board[0][1] === ch && board[1][1] === ch && board[2][1] === ch) ||
      (board[0][2] === ch && board[1][2] === ch && board[2][2] === ch) ||
      (board[0][0] === ch && board[1][1] === ch && board[2][2] === ch) ||
      (board[0][2] === ch && board[1][1] === ch && board[2][0] === ch)
    );
  }
}

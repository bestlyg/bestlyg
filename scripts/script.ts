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
function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
  const n = nums.length;
  let sum1 = 0,
    max1 = 0,
    idx1 = 0;
  let sum2 = 0,
    max2 = 0,
    idx2_1 = 0,
    idx2_2 = 0;
  let sum3 = 0,
    max3 = 0,
    idx3 = 0;
  const ans = [0, 0, 0];
  for (let idx = 2 * k; idx < n; idx++) {
    sum1 += nums[idx - 2 * k];
    sum2 += nums[idx - 1 * k];
    sum3 += nums[idx - 0 * k];
    if (idx < 3 * k) continue;
    sum1 -= nums[idx - 3 * k];
    sum2 -= nums[idx - 2 * k];
    sum3 -= nums[idx - 1 * k];
    log({ idx, sum1, sum2, sum3 });
    if (max1 < sum1) {
      max1 = sum1;
      idx1 = idx - 3 * k + 1;
    }
    if (max2 < max1 + sum2) {
      max2 = max1 + sum2;
      idx2_1 = idx1;
      idx2_2 = idx - 2 * k + 1;
    }
    console.log(ans);
    if (max3 < max2 + sum3) {
      max3 = max2 + sum3;
      idx3 = idx - 1 * k + 1;
      ans[0] = idx2_1;
      ans[1] = idx2_2;
      ans[2] = idx3;
    }
  }
  return ans;
}
log([
  maxSumOfThreeSubarrays(
    [17, 7, 19, 11, 1, 19, 17, 6, 13, 18, 2, 7, 12, 16, 16, 18, 9, 3, 19, 5],
    6
  ),
]);

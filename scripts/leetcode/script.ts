import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';

const map = new Map([
  [23, 0b00000000010000000000000000000000],
  [19, 0b00000000000001000000000000000000],
  [17, 0b00000000000000010000000000000000],
  [15, 0b00000000000000000000000000010100],
  [14, 0b00000000000000000000000001000010],
  [13, 0b00000000000000000001000000000000],
  [30, 0b00000000000000000000000000010110],
  [11, 0b00000000000000000000010000000000],
  [29, 0b00010000000000000000000000000000],
  [10, 0b00000000000000000000000000010010],
  [26, 0b00000000000000000001000000000010],
  [7, 0b00000000000000000000000001000000],
  [6, 0b00000000000000000000000000000110],
  [5, 0b00000000000000000000000000010000],
  [22, 0b00000000000000000000010000000010],
  [3, 0b00000000000000000000000000000100],
  [21, 0b00000000000000000000000001000100],
  [2, 0b00000000000000000000000000000010],
  [1, 0b00000000000000000000000000000001],
]);
const MAX = 40;

const mod = BigInt(1e9 + 7);
const factorialMap = new Map<bigint, bigint>();
function factorial(num: bigint) {
  if (num <= 20000n && factorialMap.has(num)) return factorialMap.get(num)!;
  let ans = 1n;
  for (let i = 2n; i <= num; i++) {
    ans = (ans * i) % mod;
  }
  factorialMap.set(num, ans);
  return ans;
}
function c(num1: bigint, num2: bigint): bigint {
  return factorial(num1) / factorial(BigInt(num1) - BigInt(num2)) / factorial(num2);
}
function getsum(num: bigint): bigint {
  let ans = 0n;
  for (let i = 1n; i <= num; i++) {
    ans = ans + c(num, i);
  }
  return ans;
}
console.log(getsum(BigInt(50000)));

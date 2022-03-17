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
import { ListNode } from './structures';

const item1 = [
  'AllOne',
  'inc',
  'inc',
  'inc',
  'inc',
  'inc',
  'inc',
  'getMaxKey',
  'inc',
  'dec',
  'getMaxKey',
  'dec',
  'inc',
  'getMaxKey',
  'inc',
  'inc',
  'dec',
  'dec',
  'dec',
  'dec',
  'getMaxKey',
  'inc',
  'inc',
  'inc',
  'inc',
  'inc',
  'inc',
  'getMaxKey',
  'getMinKey',
];
const item2 = [
  [],
  ['hello'],
  ['world'],
  ['leet'],
  ['code'],
  ['ds'],
  ['leet'],
  [],
  ['ds'],
  ['leet'],
  [],
  ['ds'],
  ['hello'],
  [],
  ['hello'],
  ['hello'],
  ['world'],
  ['leet'],
  ['code'],
  ['ds'],
  [],
  ['new'],
  ['new'],
  ['new'],
  ['new'],
  ['new'],
  ['new'],
  [],
  [],
];

const max = 10n;
const list: number[] = [];
for (let i = 0n; i <= max; i++) {
  let cnt = 0;

  for (let num = 10n ** i; num < 10n ** (i + 1n); num++) {
    if (check(num)) cnt++;
  }

  console.log(`${10n ** i} - ${10n ** (i + 1n)} : ${cnt}`);
  list.push(cnt);
  console.log(list);
}

function check(num: bigint): boolean {
  const cache: Record<string, boolean> = {};
  for (const ch of num.toString()) {
    if (cache[ch]) return false;
    cache[ch] = true;
  }
  return true;
}

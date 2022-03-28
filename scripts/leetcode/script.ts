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

function duplicateZeros(arr: number[]): void {
  const list = new Array(arr.length)
    .fill(0)
    .map((_, i) => i)
    .filter(v => arr[v] === 0)
    .reverse();
  for (const idx of list) {
    arr.splice(idx, 0, 0);
    arr.pop();
  }
}

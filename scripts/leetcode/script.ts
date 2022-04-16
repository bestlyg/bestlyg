import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';
import { ListNode } from './structures';

let min = 1n;
let max = 9n;
function check(num: bigint) {
  return num.toString().split('').reverse().join('') === num.toString();
}
const ans: bigint[] = [];
for (let i = 1; i <= 8; i++) {
  const startStr = String('9').repeat(i >> 1);
  let arr: bigint[] = [];
  for (let n1 = max; n1 >= min && n1.toString().startsWith(startStr); n1--) {
    for (
      let n2 = max;
      n2 >= min &&
      (arr.length === 0 || n1 >= arr[0] || n2 >= arr[1]) &&
      n2.toString().startsWith(startStr);
      n2--
    ) {
      if (check(n1 * n2) && (arr.length === 0 || n1 * n2 > arr[2])) {
        arr = [n1, n2, n1 * n2];
      }
    }
  }
  console.log(`${arr[0]} * ${arr[1]} == ${arr[2]}`);
  ans.push(arr[2]);
  min *= 10n;
  max = max * 10n + 9n;
}
console.log(ans);

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
/*

    allOne->inc("ds");
    allOne->dec("hello");
    cout << allOne->getMaxKey() << endl;

*/
for (let i = 1; i < item1.length; i++) {
  const key = item1[i];
  if (key === 'inc' || key == 'dec') {
    console.log(`allOne->${key}("${item2[i]}");`);
  } else {
    console.log(`cout << allOne->${key}() << endl;`);
  }
}

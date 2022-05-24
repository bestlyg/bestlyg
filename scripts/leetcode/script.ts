import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common, sequence } from '@bestlyg/algorithms/src';
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

console.log(sequence.kmp2('mississippi', 'mississippi'));

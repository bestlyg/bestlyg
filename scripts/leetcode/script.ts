import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
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
import { Logger } from '../utils';
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

const logger = new Logger();

const arr = [1, 1];
while (arr[arr.length - 1] <= 1e9) arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
console.log(arr.length);

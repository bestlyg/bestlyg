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
function main() {
  const a = 1;
  const b = '2';
  const c = false;
  const d = { e: 'e1', f: 'f2', aaa: { sad: 2 } };
  const g = new Set([1, 2, 3]);
  const f = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]);
  logger.log({
    a,
    b,
    c,
    d,
    g,
    f,
  });
  logger.visible = false;
  logger.log({
    a,
    b,
    c,
    d,
    g,
    f,
  });
  logger.visible = true;
  logger.log({
    a,
    b,
    c,
    d,
    g,
    f,
  });
}
main();

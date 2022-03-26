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

class FNode {
  parent: FNode | null = null;
  constructor(public name: string, public level: number) {}
  path() {
    let res = this.name;
    let parent = this.parent;
    while (parent) {
      res = parent.name + '/' + res;
      parent = parent.parent;
    }
    return res;
  }
  isFile() {
    return this.name.includes('.');
  }
}
function format(str: string): [number, string] {
  let level = 0;
  while (str[level] == '\t') level++;
  return [level, str.substr(level)];
}
function lengthLongestPath(input: string): number {
  const stack: FNode[] = [];
  let ans = '';
  for (const item of input.split('\n')) {
    const [level, str] = format(item);
    const node = new FNode(str, level);
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
    if (stack.length) {
      const parent = stack[stack.length - 1];
      node.parent = parent;
    }
    stack.push(node);
    if (node.isFile()) {
      const path = node.path();
      ans = ans.length < path.length ? path : ans;
    }
  }
  return ans.length;
}
let arr = [
  ['R', '.', 'p', '.', 'p', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['p', '.', '.', '.', '.', '.', '.', '.'],
  ['p', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
];

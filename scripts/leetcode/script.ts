import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common, sequence } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  // random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';
import { ListNode } from './structures';

const ipv4Reg = /^[0-9]*$/;
/*
string alienOrder(vector<string>& words) {
  unordered_map<char, vector<char>> s;
  int n = words.size();
  for (int i = 1; i < n; i++) comp(words[i - 1], words[i], s);
  return order(s);
}
string order(unordered_map<char, vector<char>> &s) {

}
void comp(string &w1, string &w2, unordered_map<char, vector<char>> &s) {
  int n = min(w1.size(), w2.size());
  for (int i = 0; i < n; i++) {

  }
}
*/

function run(list: (()=>Promise<any>)[], idx = 0, success: Function): void {
  list[idx]().then(success, () => run(list, idx + 1, success));
}

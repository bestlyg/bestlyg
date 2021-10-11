import { structures, log } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  const low: Record<number, string> = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
  };
  const mid = {
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen',
  };
  const high: Record<number, string> = {
    2: 'Twenty',
    3: 'Thirty',
    4: 'Forty',
    5: 'Fifty',
    6: 'Sixty',
    7: 'Seventy',
    8: 'Eighty',
    9: 'Ninety',
  };
  let ans = '';
  let mod = 10 ** 9;
  if (num >= mod) {
    ans += `${format(Math.floor(num / mod))} Billion `;
    num %= mod;
  }
  mod = 10 ** 6;
  if (num >= mod) {
    ans += `${format(Math.floor(num / mod))} Million `;
    num %= mod;
  }
  mod = 10 ** 3;
  if (num >= mod) {
    ans += `${format(Math.floor(num / mod))} Thousand `;
    num %= mod;
  }
  if (num > 0) {
    ans += `${format(num)} `;
  }
  return ans.trimEnd();
  function format(num: number) {
    let ans = '';
    if (num >= 100) {
      ans += `${low[Math.floor(num / 100)]} Hundred `;
      num %= 100;
    }
    const highNum = Math.floor(num / 10);
    const lowNum = num % 10;
    if (highNum >= 2) {
      ans += `${high[highNum]}`;
      if (lowNum > 0) ans += ` ${low[lowNum]} `;
    } else if (highNum === 1) {
      ans += `${mid[num]} `;
    } else {
      ans += `${low[num]} `;
    }
    return ans.trimEnd();
  }
}
log([
  numberToWords(1234567891),
  numberToWords(12345),
  numberToWords(0),
  numberToWords(50000),
  numberToWords(100000),
]);

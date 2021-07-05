import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function countOfAtoms(formula: string): string {
  const uperChar = /^[A-Z]$/;
  const lowerChar = /^[a-z]$/;
  const numChar = /^\d$/;
  const data = getRecord(formula);
  return Object.entries(data)
    .sort(([k1], [k2]) => {
      const len1 = k1.length;
      const len2 = k2.length;
      let i = 0;
      while (i < Math.min(len1, len2)) {
        const code1 = k1.codePointAt(i)!;
        const code2 = k2.codePointAt(i)!;
        if (code1 !== code2) return code1 - code2;
        else i++;
      }
      if (i === len1) return -1;
      else if (i === len2) return 1;
      else return 0;
    })
    .map(([k, v]) => k + (v === 1 ? '' : v))
    .join('');
  function getRecord(str: string): Record<string, number> {
    const len = str.length;
    const stack: string[] = [];
    const map: Record<string, number> = {};
    for (let i = 0; i < len; i++) {
      let c = str[i];
      if (uperChar.test(c)) {
        stack.push(c);
      } else if (lowerChar.test(c)) {
        stack.push(stack.pop()! + c);
      } else if (c === '(') {
        let left = 1;
        let tempStr = '';
        while (true) {
          if (str[i + 1] === '(') left++;
          if (str[i + 1] === ')' && --left === 0) break;
          tempStr += str[++i];
        }
        const internalRecord = getRecord(tempStr);
        i++;
        let numStr = '';
        while (numChar.test(str[i + 1])) numStr += str[++i];
        const num = +numStr;
        Object.entries(internalRecord).forEach(([k, v]) => {
          map[k] = (map[k] ?? 0) + v * (num === 0 ? 1 : num);
        });
      } else {
        while (numChar.test(str[i + 1])) c += str[++i];
        const num = +c;
        const char = stack.pop()!;
        map[char] = (map[char] ?? 0) + num;
      }
    }
    while (stack.length !== 0) {
      const c = stack.pop()!;
      map[c] = (map[c] ?? 0) + 1;
    }
    return map;
  }
}
console.log(countOfAtoms('(H)'));

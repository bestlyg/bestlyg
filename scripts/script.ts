import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*        

 */
function isMatch(s: string, p: string): boolean {
  console.log(s, p);
  if (s === '') {
    for (const c of p) if (c !== '*') return false;
    return true;
  }
  if (p === '') return s === '';
  if (p === '?') return s.length === 1;
  if (p === '*') return true;
  if (p.startsWith('?')) return isMatch(s.substring(1), p.substring(1));
  if (p.startsWith('*')) {
    while (p.startsWith('*')) p = p.substring(1);
    let c = 0;
    while (p.startsWith('?')) {
      p = p.substring(1);
      c++;
    }
    if (isMatch(s.substring(c), p)) return true;
    if (p === '') return s.length === c;
    let i1 = p.indexOf('*');
    let i2 = p.indexOf('?');
    if (i1 === -1) {
      if (i2 === -1) return s.includes(p);
      const i = s.indexOf(p.substring(0, i2));
      if (c && i !== c) return false;
      else return isMatch(s.substring(i + p.substring(0, i).length), p.substring(i));
    }
    const minI = i1 === -1 ? i2 : i2 === -1 ? i1 : Math.min(i1, i2);
    let i = s.indexOf(p.substring(0, minI));
    while (i !== -1) {
      if (c && i !== c) return false;
      if (isMatch(s.substring(i + p.substring(0, minI).length), p.substring(minI))) return true;
      i = s.indexOf(p.substring(0, minI), i + 1);
    }
    return false;
  }
  const i1 = p.indexOf('*');
  const i2 = p.indexOf('?');
  if (i1 === -1 && i2 === -1) return s === p;
  const minI = i1 === -1 ? i2 : i2 === -1 ? i1 : Math.min(i1, i2);
  if (s.startsWith(p.substring(0, minI))) return isMatch(s.substring(minI), p.substring(minI));
  else return false;
}
console.log(isMatch('hi', '*?'));

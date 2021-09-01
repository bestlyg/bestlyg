import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
function compareVersion(version1: string, version2: string): number {
  const v1 = version1.split('.').map(v => +v);
  const v2 = version2.split('.').map(v => +v);
  const len = Math.max(v1.length, v2.length);
  while (v1.length < len) v1.push(0);
  while (v2.length < len) v2.push(0);
  let i = 0;
  console.log('step 1', `v1=${v1};v2=${v2}`);
  while (i < len) {
    console.log(`i=${i}`);
    console.log(`res=${res}`);
    if (v1[i] < v2[i]) return -1;
    else if (v1[i] > v2[i]) return 1;
    else i++;
  }
  return 0;
}
// console.log(compareVersion('1.01', '1.001'));
// console.log(compareVersion('1.0', '1.0.0'));
console.log(compareVersion('1.0.1', '1'));
console.log(compareVersion('7.5.2.4', '7.5.3'));

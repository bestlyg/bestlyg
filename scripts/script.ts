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
function multiply(num1: string, num2: string): string {
  const n1 = num1.length;
  const n2 = num2.length;
  const list1 = new Array(n1)
    .fill(0)
    .map((_, i) => +num1[i])
    .reverse();
  const list2 = new Array(n2)
    .fill(0)
    .map((_, i) => +num2[i])
    .reverse();
  const n = n1 + n2 - 1;
  const ans: number[] = new Array(n).fill(0);
  for (let i = 0; i < n1; i++) {
    for (let j = 0; j < n2; j++) {
      ans[i + j] += list1[i] * list2[j];
    }
  }
  let add = 0;
  for (let i = 0; i < n; i++) {
    if (add) {
      ans[i] += add;
      add = 0;
    }
    if (ans[i] >= 10) {
      add = ~~(ans[i] / 10);
      ans[i] = ans[i] % 10;
    }
  }
  if (add) ans.push(add);
  while (ans.length > 1 && ans[ans.length - 1] === 0) ans.pop();
  return ans.reverse().join('');
}
console.log(multiply('9', '9'));

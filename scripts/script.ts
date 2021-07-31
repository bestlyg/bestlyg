import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { find, merge, min, random, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 
 
 */
function verticalTraversal(root: TreeNode | null): number[][] {
  if (root === null) return [];
  const map = new Map<number, number[][]>();
  order(root, 0, 0);
  const list = [...map.entries()]
    .sort(([col1], [col2]) => col1 - col2)
    .map(([, list]) =>
      list
        .sort(([, row1, val1], [, row2, val2]) => (row1 === row2 ? val1 - val2 : row1 - row2))
        .map(([, , v]) => v)
    );
  return list;
  function order(node: TreeNode | null, row: number, col: number) {
    if (node === null) return null;
    let list = map.get(col);
    if (!list) map.set(col, (list = []));
    list.push([col, row, node.val]);
    order(node.left, row + 1, col - 1);
    order(node.right, row + 1, col + 1);
  }
}
console.log(verticalTraversal(TreeNode.factory([1, 2, 3, 4, 5, 6, 7])));

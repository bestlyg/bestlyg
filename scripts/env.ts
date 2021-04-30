import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { min, random } from 'lodash';
const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
const tree = new RBTree<number>((t1, t2) => t1 - t2);
const list: number[] = [];
[52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12].forEach(v => {
  tree.add(v);
  list.push(v);
});
// [100, 97, 88, 84, 67, 74].forEach(v => tree.remove(v));
console.log(tree.print());

console.log(list);

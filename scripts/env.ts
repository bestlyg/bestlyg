import { structures } from './utils';
import { BinarySearchTree } from '@bestlyg/data-structure/src';
import { random } from 'lodash';

const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
let i = 0;
while (i++ < 20) {
  const num = random(0, 100);
  tree.add(num);
}
console.log(tree.print());

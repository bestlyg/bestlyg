import { structures } from './utils';
import { BinarySearchTree } from '@bestlyg/data-structure/src';

const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
const tree = new BinarySearchTree<number>((t1, t2) => t1 - t2);
console.log(tree);

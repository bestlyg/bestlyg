import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
import { min, random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
function decode(encoded: number[], first: number): number[] {
  return [first, ...encoded.map(num => (first = num ^ first))];
}

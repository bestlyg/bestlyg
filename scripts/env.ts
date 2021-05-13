import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3 } from '@bestlyg/algorithms/src';
import { random } from 'lodash';
const { TreeNode, UnionFind } = structures;
type TreeNode = structures.TreeNode;
type UnionFind = structures.UnionFind;
const arr = [1920, 1080];
console.log(arr.map(v => (v * 4) / 3));

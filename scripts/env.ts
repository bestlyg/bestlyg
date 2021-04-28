import { structures } from './utils';
import { AVLTree } from '@bestlyg/data-structure/src';
import { random } from 'lodash';

const { TreeNode } = structures;
type TreeNode = structures.TreeNode;
const list: number[] = [];
const tree = new AVLTree<number>((t1, t2) => t1 - t2);
// [73, 6, 31, 58, 24, 9, 16, 50, 83, 5, 15, 75, 8, 77, 11, 75, 41, 92, 29, 85].forEach(v =>
//   tree.add(v)
// );
// tree.add(0);
// tree.add(2);
// tree.add(3);
let i = 0;
while (i++ < 20) {
  const num = random(0, 100);
  tree.add(num);
  list.push(num);
}
// [83, 92, 77, 50, 41, 73, 85, 58].forEach(v => tree.remove(v));
// tree.remove(41);
console.log(tree.print());
console.log(list);

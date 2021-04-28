const { BinarySearchTree, AVLTree } = require('../packages/data-structure');
const { random } = require('lodash');
const tree = new AVLTree((t1, t2) => t1 - t2);
tree.add(0);
tree.add(2);
tree.add(3);
// let i = 0;
// while (i++ < 20) {
//   const num = random(0, 100);
//   tree.add(num);
// }
console.log(tree.print());

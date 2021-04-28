const { BinarySearchTree } = require('../packages/data-structure');
const { random } = require('lodash');
const tree = new BinarySearchTree((t1, t2) => t1 - t2);
let i = 0;
while (i++ < 20) {
  tree.add(random(0, 100));
}
console.log(tree.print());

// import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structure/src';
// import { min, random } from 'lodash';
// const { TreeNode, UnionFind } = structures;
// type TreeNode = structures.TreeNode;
// type UnionFind = structures.UnionFind;
class UnionFind {
  elements: number[];
  constructor(public size: number) {
    this.elements = new Array(size).fill(0).map((_, i) => i);
  }
  same(v1: number, v2: number): boolean {
    return this.find(v1) === this.find(v2);
  }
  find(v: number): number {
    return v === this.elements[v] ? v : (this.elements[v] = this.find(this.elements[v]));
  }
  union(v1: number, v2: number): void {
    const e1 = this.find(v1);
    const e2 = this.find(v2);
    if (e1 !== e2) {
      this.elements[e1] = e2;
      this.size--;
    }
  }
}
function equationsPossible(equations: string[]): boolean {
  equations.sort((a, b) => {
    if (a[1] === '=') return -1;
    return 1;
  });
  console.log(equations);
  const uf = new UnionFind(26);
  const toNum = (char: string) => char.codePointAt(0)! - 'a'.codePointAt(0)!;
  for (const equation of equations) {
    const num1 = toNum(equation[0]);
    const num2 = toNum(equation[3]);
    const same = equation[1] === '=';
    if (same) uf.union(num1, num2);
    else if (uf.same(num1, num2)) return false;
  }
  return true;
}
console.log(equationsPossible(['a==b', 'b!=c', 'c==a']));

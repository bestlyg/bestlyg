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

function findCircleNum(isConnected: number[][]): number {
  const len = isConnected.length;
  const uf = new UnionFind(len);
  for (let i = 0; i < len; i++) {
    const connect = isConnected[i];
    for (let j = 0; j < len; j++) {
      connect[j] === 1 && uf.union(i, j);
    }
  }
  return uf.size;
}

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
function leastBricks(wall: number[][]): number {
  const rowLen = wall.length;
  const size = wall[0].reduce((total, cur) => total + cur, 0);
  if (wall.every(row => row.length === 1)) return rowLen * size;
  const map: Record<number, number> = {};
  for (const row of wall) {
    let sum = -1;
    for (const col of row) {
      sum += col;
      map[sum] = 1 + (map[sum] ?? 0);
    }
  }
  Reflect.deleteProperty(map, size - 1);
  console.log(map);
  return rowLen - Math.max(...Object.values(map));
}
console.log(leastBricks([[2], [2], [2]]));

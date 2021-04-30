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
function numIslands(grid: string[][]): number {
  let count = 0;
  const newGrid: number[][] = grid.map(row => row.map(col => (col === '0' ? -1 : count++)));
  const rowLen = grid.length;
  const colLen = grid[0].length;
  const uf = new UnionFind(count);
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const num = newGrid[row][col];
      console.log(`row=${row},col=${col},num=${num}`);
      if (num === 0) continue;
      if (row > 0 && newGrid[row - 1][col] > -1) uf.union(num, newGrid[row - 1][col]);
      if (col > 0 && newGrid[row][col - 1] > -1) uf.union(num, newGrid[row][col - 1]);
      if (row < rowLen - 1 && newGrid[row + 1][col] > -1) uf.union(num, newGrid[row + 1][col]);
      if (col < colLen - 1 && newGrid[row][col + 1] > -1) uf.union(num, newGrid[row][col + 1]);
    }
  }
  console.log(newGrid, count, uf);
  return uf.size;
}
console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ])
);

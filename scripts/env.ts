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
function longestConsecutive(nums: number[]): number {
  nums = [...new Set(nums)];
  const len = nums.length;
  if (len === 0) return 0;
  const uf = new UnionFind(len);
  const map = new Map(nums.map((v, i) => [v, i]));
  const ansMap = new Map<number, number>();
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    const num_minus = map.get(num - 1);
    if (num_minus) {
      uf.union(i, num_minus);
      const index = uf.find(i);
      ansMap.set(index, (ansMap.get(index) ?? 0) + 1);
    }
    const num_add = map.get(num + 1);
    if (num_add) {
      uf.union(i, num_add);
      const index = uf.find(i);
      ansMap.set(index, (ansMap.get(index) ?? 0) + 1);
    }
  }
  const cache: Record<number, number> = {};
  for (let i = 0; i < len; i++) {
    const num = uf.find(i);
    cache[num] = (cache[num] ?? 0) + 1;
  }
  return [...Object.entries(cache)].sort(([, c1], [, c2]) => c2 - c1)[0][1];
}
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));

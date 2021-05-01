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

class Employee {
  constructor(
    public id: number = 0,
    public importance: number = 0,
    public subordinates: number[] = []
  ) {}
}
function GetImportance(employees: Employee[], id: number): number {
  const map = employees.reduce((map, emp) => {
    map.set(emp.id, emp);
    return map;
  }, new Map<number, Employee>());
  const find = (id: number): number => {
    const emp = map.get(id)!;
    return (
      emp.importance + emp.subordinates.map(id => find(id)).reduce((total, cur) => total + cur, 0)
    );
  };
  return find(id);
}
const list: Employee[] = [
  [1, 5, [2, 3]],
  [2, 3, []],
  [3, 3, []],
].map(
  ([id, importance, subordinates]: [number, number, number[]]) =>
    new Employee(id, importance, subordinates)
);
console.log(getImportance(list, 1));

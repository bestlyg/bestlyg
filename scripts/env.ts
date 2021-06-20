import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
class Person {
  children: Person[] = [];
  dead = false;
  constructor(public name: string) {}
}
class ThroneInheritance {
  king = new Person('');
  nameMap = new Map<string, Person>();
  constructor(kingName: string) {
    this.king.name = kingName;
    this.nameMap.set(kingName, this.king);
  }
  birth(parentName: string, childName: string): void {
    const parent = this.nameMap.get(parentName)!;
    const child = new Person(childName);
    this.nameMap.set(childName, child);
    parent.children.push(child);
  }
  death(name: string): void {
    this.nameMap.get(name)!.dead = true;
  }
  getInheritanceOrder(): string[] {
    return this._getInheritanceOrder(this.king)
      .filter(v => !v.dead)
      .map(v => v.name);
  }
  private _getInheritanceOrder(person: Person): Person[] {
    const ans: Person[] = [person];
    person.children.forEach(child => {
      ans.push(...this._getInheritanceOrder(child));
    });
    return ans;
  }
}
const t = new ThroneInheritance('king'); // 继承顺序：king
t.birth('king', 'andy'); // 继承顺序：king > andy
t.birth('king', 'bob'); // 继承顺序：king > andy > bob
t.birth('king', 'catherine'); // 继承顺序：king > andy > bob > catherine
t.birth('andy', 'matthew'); // 继承顺序：king > andy > matthew > bob > catherine
t.birth('bob', 'alex'); // 继承顺序：king > andy > matthew > bob > alex > catherine
t.birth('bob', 'asha'); // 继承顺序：king > andy > matthew > bob > alex > asha > catherine
console.log(t.getInheritanceOrder()); // 返回 ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
t.death('bob'); // 继承顺序：king > andy > matthew > bob（已经去世）> alex > asha > catherine
console.log(t.getInheritanceOrder()); // 返回 ["king", "andy", "matthew", "alex", "asha", "catherine"]

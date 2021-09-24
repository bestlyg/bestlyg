import { structures } from './utils';
import { TreeMap } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, size, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

/*
 */
class Node {
  val: number;
  prev: Node | null;
  next: Node | null;
  child: Node | null;
  constructor(val?: number, prev?: Node, next?: Node, child?: Node) {
    this.val = val === undefined ? 0 : val;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
    this.child = child === undefined ? null : child;
  }
}
function flatten(head: Node | null): Node | null {
  if (head === null) return null;
  return format(head)[0];
  function format(node: Node): [Node, Node] {
    if (node.child === null && node.next === null) return [node, node];
    node.prev = null;
    let prev: Node = node;
    let p: Node | null = node;
    while (p) {
      console.log('in', p);
      const next = p.next;
      if (p.child) {
        const [first, last] = format(p.child);
        console.log(p.val, first, last);
        p.next = first;
        first.prev = p;
        last.next = next;
        if (next) next.prev = last;
        prev = last;
      } else {
        prev = p;
      }
      p.child = null;
      p = next;
    }
    return [node, prev];
  }
}
const list: Node[] = [];
for (let i = 0; i <= 10; i++) list[i] = new Node(i);
list[0].child = list[1];
list[1].child = list[2];

const node = flatten(list[0]);
let p = node;
while (p) {
  console.log('====');
  console.log(`node:${p.val},next:${p.next?.val ?? null},prev:${p.prev?.val ?? null}`);
  if (p.child) {
    console.log(`has child`);
    console.log(p.child);
    break;
  }
  p = p.next;
}

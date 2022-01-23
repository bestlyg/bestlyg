import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  min,
  random,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger } from '../utils';
// type TrieNode = structures.TrieNode;
// type Trie = structures.Trie;

const logger = new Logger();

class Node {
  constructor(
    public timestamp: number,
    public price: number,
    public imax: number,
    public imin: number
  ) {}
}
class Heap<Node> {
  private arr: Node[] = [];
  get isEmpty() {
    return this.size === 0;
  }
  get size() {
    return this.arr.length;
  }
  get top() {
    return this.arr[0];
  }
  constructor(private compare: (t1: Node, t2: Node) => number, private idx_field: string) {}
  add(num: Node): void {
    this.arr.push(num);
    this.shiftUp(this.size - 1);
  }
  remove(): Node {
    const num = this.arr.shift()!;
    if (this.size) {
      this.arr.unshift(this.arr.pop()!);
      this.shiftDown(0);
    }
    return num;
  }
  shiftUp(index: number): void {
    if (index === 0) return;
    const parentIndex = (index - 1) >> 1;
    if (this.compare(this.arr[index], this.arr[parentIndex]) > 0) {
      this.arr[index][this.idx_field] = parentIndex;
      this.arr[parentIndex][this.idx_field] = index;
      [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index: number): void {
    let childrenIndex = index * 2 + 1;
    if (childrenIndex > this.size - 1) return;
    if (
      childrenIndex + 1 <= this.size - 1 &&
      this.compare(this.arr[childrenIndex + 1], this.arr[childrenIndex]) > 0
    ) {
      childrenIndex++;
    }
    if (this.compare(this.arr[childrenIndex], this.arr[index]) > 0) {
      this.arr[index][this.idx_field] = childrenIndex;
      this.arr[childrenIndex][this.idx_field] = index;
      [this.arr[childrenIndex], this.arr[index]] = [this.arr[index], this.arr[childrenIndex]];
      this.shiftDown(childrenIndex);
    }
  }
  *[Symbol.iterator](): IterableIterator<Node> {
    for (const t of this.arr) {
      yield t;
    }
  }
}

class StockPrice {
  heap_max = new Heap<Node>((t1, t2) => t1.price - t2.price, 'imax');
  heap_min = new Heap<Node>((t1, t2) => t2.price - t1.price, 'imin');
  map = new Map<number, Node>();
  time_max = -1;
  update(timestamp: number, price: number): void {
    this.time_max = Math.max(this.time_max, timestamp);
    const cnt = this.map.size;
    let node = this.map.get(timestamp);
    if (node) {
      node.price = price;
      this.heap_max.shiftUp(node.imax);
      this.heap_max.shiftDown(node.imax);
      this.heap_min.shiftUp(node.imin);
      this.heap_min.shiftDown(node.imin);
    } else {
      this.map.set(timestamp, (node = new Node(timestamp, price, cnt, cnt)));
      this.heap_max.add(node);
      this.heap_min.add(node);
    }
  }
  current(): number {
    return this.map.get(this.time_max)!.price;
  }
  maximum(): number {
    return this.heap_max.top.price;
  }
  minimum(): number {
    return this.heap_min.top.price;
  }
}
const obj = new StockPrice();
obj.update(1, 10);
obj.update(2, 5);

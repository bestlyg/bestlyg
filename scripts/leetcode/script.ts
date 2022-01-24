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
  next: Node[] = [];
  min_time1 = Infinity;
  min_time2 = Infinity;
  constructor(public idx: number) {}
}
class Car {
  constructor(public current: Node, public time = 0) {}
}
function secondMinimum(n: number, edges: number[][], time: number, change: number): number {
  const nodes: Record<number, Node> = {};
  for (let i = 1; i <= n; i++) nodes[i] = new Node(i);
  for (const [n1, n2] of edges) {
    const node1 = nodes[n1];
    const node2 = nodes[n2];
    node1.next.push(node2);
    node2.next.push(node1);
  }
  nodes[1].min_time1 = 0;
  const queue: Car[] = [new Car(nodes[1])];
  const arr: Car[] = [];
  while (queue.length) {
    const car = queue.shift()!;
    const wait_check = Math.floor(car.time / change);
    const next_time = wait_check % 2 === 0 ? car.time + time : (wait_check + 1) * change + time;
    for (const next of car.current.next) {
      if (next_time < next.min_time1) {
        const ncar = new Car(next, next_time);
        next.min_time1 = next_time;
        if (next === nodes[n]) {
          arr.push(ncar);
          continue;
        }
        queue.push(ncar);
      } else if (next_time > next.min_time1 && next_time < next.min_time2) {
        const ncar = new Car(next, next_time);
        next.min_time2 = next_time;
        if (next === nodes[n]) {
          arr.push(ncar);
          continue;
        }
        queue.push(ncar);
      }
    }
  }
  arr.sort((a, b) => a.time - b.time);
  const min_car = arr[0];
  let min21_car: Car | null = null;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].time !== min_car.time) {
      min21_car = arr[i];
      break;
    }
  }
  const min22 = getNext(min_car);
  return Math.min(min21_car?.time ?? Infinity, min22);
  function getNext(car: Car): number {
    // 回去
    let wait_check = Math.floor(car.time / change);
    let next_time = wait_check % 2 === 0 ? car.time + time : (wait_check + 1) * change + time;
    // 回来
    wait_check = Math.floor(next_time / change);
    next_time = wait_check % 2 === 0 ? next_time + time : (wait_check + 1) * change + time;
    return next_time;
  }
}

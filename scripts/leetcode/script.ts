/*
import { HashMap, toHash } from '@bestlyg/data-structures/src';
import { encryption, common } from '@bestlyg/algorithms/src';
import {
  fill,
  find,
  first,
  merge,
  random,
  remove,
  reverse,
  size,
  takeWhile,
  upperFirst,
} from 'lodash';
import { Logger, resolve, fs } from '../utils';
import { ListNode } from './structures';
*/

class MyCache {
  private list: (() => Promise<void>)[] = [];
  get size() {
    return this.list.length;
  }
  insert(fn: () => Promise<void>) {
    this.list.push(fn);
  }
  getFirst() {
    if (this.list.length === 0) return null;
    const first = this.list[0];
    this.list.shift();
    return first;
  }
}
const cache = new MyCache();

class Customer {
  running = false;
  constructor(private cache: MyCache) {}
  run() {
    if (this.running) return;
    this.running = true;
    this._run();
  }
  private _run() {
    const fn = this.cache.getFirst();
    if (fn === null) {
      this.running = false;
      return;
    }
    fn().finally(() => {
      this._run();
    });
  }
}
const customer = new Customer(cache);

abstract class User {
  constructor(protected cache: MyCache) {}
  abstract run(...data: any[]): void;
}
class UserImage extends User {
  run(image: string) {
    const fn = () =>
      new Promise<void>(resolve => {
        setTimeout(() => {
          console.log(image);
          resolve();
        }, 200);
      });
    this.cache.insert(fn);
    customer.run();
  }
}
class UserVideo extends User {
  run(video: string) {
    const fn = () =>
      new Promise<void>(resolve => {
        setTimeout(() => {
          console.log(video);
          resolve();
        }, 200);
      });
    this.cache.insert(fn);
    customer.run();
  }
}
const userImage = new UserImage(cache);
const userVideo = new UserVideo(cache);

function flat(arr: any, level: number): any {
  if (level === 0) return arr;
  const res: any[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) res.push(...flat(item, level - 1));
    else res.push(item);
  }
  return res;
}

console.log(flat([[3, 4], 2, 4, [2, [3, [5]]]], 1));

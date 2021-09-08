import { TreeMap } from './treeMap';
export interface Set<T> {
  size: number;
  empty: boolean;
  clear: () => void;
  contains: (val: T) => boolean;
  add: (val: T) => void;
  remove: (val: T) => void;
}
export class TreeSet<T> implements Set<T> {
  private map = new TreeMap<T, null>((t1, t2) => this.compare(t1, t2));
  get size() {
    return this.map.size;
  }
  get empty() {
    return this.size === 0;
  }
  constructor(private compare: (t1: T, t2: T) => number) {}
  clear() {
    this.map.clear();
  }
  contains(val: T) {
    return this.map.contains(val);
  }
  add(val: T) {
    this.map.set(val, null);
  }
  remove(val: T) {
    this.map.remove(val);
  }
}

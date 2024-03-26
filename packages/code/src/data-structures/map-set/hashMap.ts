import { Map } from './map';
import { TreeMap } from './treeMap';

export function toHash(data: any, max: number) {
    const jsonStr = JSON.stringify(data);
    let res = 0;
    for (let i = 0, n = jsonStr.length; i < n; i++) {
        res = (res + jsonStr.codePointAt(i)!) % max;
    }
    return res;
}
export class HashMap<K, V> implements Map<K, V> {
    private list: TreeMap<K, V>[] = [];
    private _size = 0;
    get size() {
        return this._size;
    }
    get empty() {
        return this._size === 0;
    }
    constructor(private compare: (t1: K, t2: K) => number, private max = 31) {}
    clear() {
        this.list.length = 0;
        this._size = 0;
    }
    contains(key: K) {
        const tree = this.list[toHash(key, this.max)];
        if (!tree) return false;
        return tree.contains(key);
    }
    get(key: K) {
        const tree = this.list[toHash(key, this.max)];
        if (!tree) return undefined;
        return tree.get(key);
    }
    set(key: K, val: V) {
        const idx = toHash(key, this.max);
        let tree = this.list[idx];
        if (!tree) this.list[idx] = tree = new TreeMap(this.compare);
        if (tree.set(key, val)) {
            this._size++;
            return true;
        } else return false;
    }
    remove(key: K) {
        const tree = this.list[toHash(key, this.max)];
        if (!tree) return false;
        if (tree.remove(key)) {
            this._size--;
            return true;
        } else return false;
    }
}

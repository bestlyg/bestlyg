class Heap<T = number> {
  private arr: T[] = [];
  get isEmpty() {
    return this.size === 0;
  }
  get size() {
    return this.arr.length;
  }
  get top() {
    return this.arr[0];
  }
  constructor(private compare: (t1: T, t2: T) => number) {}
  add(num: T): void {
    this.arr.push(num);
    this.shiftUp(this.size - 1);
  }
  remove(): T {
    const num = this.arr.shift()!;
    if (this.size) {
      this.arr.unshift(this.arr.pop()!);
      this.shiftDown(0);
    }
    return num;
  }
  private shiftUp(index: number): void {
    if (index === 0) return;
    const parentIndex = (index - 1) >> 1;
    if (this.compare(this.arr[index], this.arr[parentIndex]) > 0) {
      [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
      this.shiftUp(parentIndex);
    }
  }
  private shiftDown(index: number): void {
    let childrenIndex = index * 2 + 1;
    if (childrenIndex > this.size - 1) return;
    if (
      childrenIndex + 1 <= this.size - 1 &&
      this.compare(this.arr[childrenIndex + 1], this.arr[childrenIndex]) > 0
    ) {
      childrenIndex++;
    }
    if (this.compare(this.arr[childrenIndex], this.arr[index]) > 0) {
      [this.arr[childrenIndex], this.arr[index]] = [this.arr[index], this.arr[childrenIndex]];
      this.shiftDown(childrenIndex);
    }
  }
  *[Symbol.iterator](): IterableIterator<T> {
    for (const t of this.arr) {
      yield t;
    }
  }
}
function mincostToHireWorkers(quality: number[], wage: number[], k: number): number {
  const len = quality.length;
  const arr = new Array(len)
    .fill(0)
    .map((_, i) => i)
    .sort((i1, i2) => wage[i1] / quality[i1] - wage[i2] / quality[i2]);
  const heap = new Heap<number>((t1, t2) => t2 - t1);
  let i = 0;
  let sum = 0;
  let ans = Infinity;
  for (; i < k - 1; i++) {
    sum += quality[arr[i]];
    heap.add(quality[arr[i]]);
  }
  for (; i < len; i++) {
    sum += quality[arr[i]];
    heap.add(quality[arr[i]]);
    ans = Math.min(ans, (wage[arr[i]] / quality[arr[i]]) * sum);
    sum -= heap.remove();
  }
  return ans;
}

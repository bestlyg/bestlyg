export class Heap<T> {
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
  constructor(private compare: (num1: T, num2: T) => number) {}
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
}

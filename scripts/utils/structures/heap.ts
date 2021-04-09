export class Heap {
  private arr: number[] = [];
  get isEmpty() {
    return this.size === 0;
  }
  get size() {
    return this.arr.length;
  }
  constructor(private compare: (num1: number, num2: number) => number) {}
  add(num: number): void {
    this.arr.push(num);
    this.shiftUp(this.size - 1);
  }
  remove(): number {
    const num = this.arr.shift()!;
    this.arr.unshift(this.arr.pop()!);
    this.shiftDown(0);
    return num;
  }
  private shiftUp(index: number): void {
    const parentIndex = (index - 1) >> 1;
    if (this.compare(this.arr[index], this.arr[parentIndex]) > 0) {
      [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
      this.shiftUp(parentIndex);
    }
  }
  private shiftDown(index: number): void {
    let childrenIndex = index * 2 + 1;
    if (this.compare(this.arr[childrenIndex + 1], this.arr[childrenIndex]) > 0) {
      childrenIndex++;
    }
    if (this.compare(this.arr[childrenIndex], this.arr[index]) > 0) {
      [this.arr[childrenIndex], this.arr[index]] = [this.arr[index], this.arr[childrenIndex]];
      this.shiftDown(childrenIndex);
    }
  }
}

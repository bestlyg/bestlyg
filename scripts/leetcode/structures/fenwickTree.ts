export class FenwickTree {
  arr: number[];
  constructor(private n: number) {
    this.arr = new Array(n + 1).fill(0);
  }
  add(idx: number, num: number): void {
    while (idx <= this.n) {
      this.arr[idx] += num;
      idx += this.lowbit(idx);
    }
  }
  at(idx: number): number {
    return this.query(idx) - this.query(idx - 1);
  }
  query(idx: number): number {
    let sum = 0;
    while (idx) {
      sum += this.arr[idx];
      idx -= this.lowbit(idx);
    }
    return sum;
  }
  lowbit(num: number) {
    return num & -num;
  }
}

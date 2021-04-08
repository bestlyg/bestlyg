export class Heap {
  get isEmpty() {
    return this.size === 0;
  }
  constructor(public size: number, public compare: (num1: number, num2: number) => number) {}
}

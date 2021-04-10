import { structures } from '../utils';

const { Heap } = structures;
class MedianFinder {
  private leftHeap = new Heap<number>((num1: number, num2: number) => num1 - num2);
  private rightHeap = new Heap<number>((num1: number, num2: number) => num2 - num1);
  get size() {
    return this.leftHeap.size + this.rightHeap.size;
  }
  addNum(num: number): void {
    if (!this.leftHeap.size || this.leftHeap.top >= num) {
      this.leftHeap.add(num);
    } else {
      this.rightHeap.add(num);
    }
    if (this.leftHeap.size === this.rightHeap.size + 2) {
      this.rightHeap.add(this.leftHeap.remove());
    } else if (this.leftHeap.size === this.rightHeap.size - 1) {
      this.leftHeap.add(this.rightHeap.remove());
    }
  }
  findMedian(): number {
    if (this.size % 2 === 0) {
      return (this.leftHeap.top + this.rightHeap.top) / 2;
    } else {
      return this.leftHeap.top;
    }
  }
}
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian());
mf.addNum(3);
console.log(mf);

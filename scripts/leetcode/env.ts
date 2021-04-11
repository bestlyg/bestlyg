import { structures } from '../utils';

const { Heap } = structures;
function nthUglyNumber(n: number): number {
  if (n === 1) return 1;
  let c = 1;
  const heap = new Heap<number>((t1, t2) => t2 - t1);
  heap.add(1);
  while (c++ < n) {
    const ans = heap.remove();
    if (ans % 5 === 0) {
      heap.add(ans * 5);
    } else if (ans % 3 === 0) {
      heap.add(ans * 5);
      heap.add(ans * 3);
    } else {
      heap.add(ans * 5);
      heap.add(ans * 3);
      heap.add(ans * 2);
    }
  }
  return heap.remove();
}
console.log(nthUglyNumber(10));

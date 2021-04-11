import { structures } from '../utils';

const { Heap } = structures;
function lastStoneWeight(stones: number[]): number {
  const heap = new Heap((t1, t2) => t1 - t2);
  stones.forEach(v => heap.add(v));
  while (heap.size > 1) {
    const s1 = heap.remove();
    const s2 = heap.remove();
    if (s1 === s2) continue;
    heap.add(Math.abs(s1 - s2));
  }
  return heap.size === 0 ? 0 : heap.remove();
}
console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));

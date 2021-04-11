import { structures } from '../utils';

const { Heap } = structures;
function nthSuperUglyNumber(n: number, primes: number[]): number {
  if (n === 1) return 1;
  const heap = new Heap<number>((t1, t2) => t2 - t1);
  heap.add(1);
  primes.forEach(v => heap.add(v));
  let c = 1;
  const primeLen = primes.length;
  const addPrimeToHeap = (num: number, index: number) => {
    while (index < primeLen) {
      heap.add(num * primes[index++]);
    }
  };
  while (c++ < n) {
    const ans = heap.remove();
    for (let i = primeLen - 1; i >= 0; i--) {
      if (ans % primes[i] === 0) {
        addPrimeToHeap(ans, i);
        break;
      }
    }
  }
  return heap.remove();
}
console.log(nthSuperUglyNumber(12, [2, 7, 13, 19]));

// import { structures } from '../utils';

// const { Heap } = structures;
function maximumScore(a: number, b: number, c: number): number {
  if (a > b) [a, b] = [b, a];
  if (a > c) [a, c] = [c, a];
  if (b > c) [b, c] = [c, b];
  const num = Math.min(a, c - b);
  if (a - num === 0) return num + b;
  else return num + (a >> 1) + b;
}
console.log(maximumScore(2, 6, 4));

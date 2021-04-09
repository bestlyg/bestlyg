import { structures } from '../utils';

const { Heap } = structures;

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const sum = (arr: number[]) => arr.reduce((total, cur) => total + cur, 0);
  const heap = new Heap<number[]>((nums1, nums2) => sum(nums2) - sum(nums1));
  nums1.forEach(num1 => nums2.forEach(num2 => heap.add([num1, num2])));
  const ans: number[][] = [];
  while (heap.size && k--) {
    console.log(heap);
    ans.push(heap.remove());
  }
  return ans;
}
console.log(kSmallestPairs([1, 2], [3], 3));

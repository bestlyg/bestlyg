import { structures } from './utils';
// import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
// import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { fill, find, first, merge, min, random, reverse, upperFirst } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;

function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number
): number {
  const map = new Map<number, number[]>();
  for (let i = 0; i < flights.length; i++) {
    const [from] = flights[i];
    let list = map.get(from);
    if (!list) map.set(from, (list = []));
    list.push(i);
  }
  const dp = new Array(k + 2).fill(0).map(_ => new Array(n).fill(Infinity));
  dp[0][src] = 0;
  let ans = Infinity;
  console.log(map);
  for (let i = 1; i <= k + 1; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
      if (dp[i - 1][j] === Infinity) continue;
      const list = map.get(j);
      if (!list) continue;
      for (const flightIdx of list) {
        const [, to, price] = flights[flightIdx];
        dp[i][to] = Math.min(dp[i][to], dp[i - 1][j] + price);
        if (to === dst) ans = Math.min(dp[i][to], ans);
      }
      console.log(dp);
    }
  }
  return ans === Infinity ? -1 : ans;
}
console.log(
  findCheapestPrice(
    5,
    [
      [1, 2, 10],
      [2, 0, 7],
      [1, 3, 8],
      [4, 0, 10],
      [3, 4, 2],
      [4, 2, 10],
      [0, 3, 3],
      [3, 1, 6],
      [2, 4, 5],
    ],
    0,
    4,
    1
  )
);

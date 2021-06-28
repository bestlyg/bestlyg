import { structures } from './utils';
import { AVLTree, RBTree } from '@bestlyg/data-structures/src';
import { quickSort3, heapSort, bubbleSort, countingSort, radixSort } from '@bestlyg/algorithms/src';
import { merge, random } from 'lodash';
const { TreeNode, UnionFind, ListNode, Heap } = structures;
type TreeNode = structures.TreeNode;
type ListNode = structures.ListNode;
type UnionFind = structures.UnionFind;
type Heap = structures.Heap;
/*

 */
function numBusesToDestination(routes: number[][], source: number, target: number): number {
  if (source === target) return 0;
  const stationMap = new Map<number, Set<number>>();
  for (let routeIndex = 0, routeLen = routes.length; routeIndex < routeLen; routeIndex++) {
    const route = routes[routeIndex];
    for (
      let stationIndex = 0, stationLen = route.length;
      stationIndex < stationLen;
      stationIndex++
    ) {
      const station = route[stationIndex];
      let set = stationMap.get(station);
      if (!set) stationMap.set(station, (set = new Set()));
      set.add(routeIndex);
    }
  }
  const busMap = new Map<number, Set<number>>();
  for (const busList of stationMap.values()) {
    if (busList.size === 1) continue;
    for (const bus of busList) {
      let set = busMap.get(bus);
      if (!set) busMap.set(bus, (set = new Set()));
      for (const nextBus of busList) if (nextBus !== bus) set.add(nextBus);
    }
  }
  const FIRST_BUS = stationMap.get(source)!;
  const LAST_BUS = stationMap.get(target)!;
  if (!FIRST_BUS || !LAST_BUS || FIRST_BUS.size === 0 || LAST_BUS.size === 0) return -1;
  for (const bus of FIRST_BUS) if (LAST_BUS.has(bus)) return 1;
  let ans = Infinity;
  const stepMap = new Map<number, number>();
  for (const bus of FIRST_BUS) stepMap.set(bus, 1);
  const queue: number[] = [...FIRST_BUS];
  while (queue.length !== 0) {
    const bus = queue.shift()!;
    const step = stepMap.get(bus)!;
    if (LAST_BUS.has(bus)) {
      ans = Math.min(ans, step);
      continue;
    }
    const nextBusList = busMap.get(bus)!;
    for (const nextBus of nextBusList ?? []) {
      if (!stepMap.has(nextBus)) queue.push(nextBus);
      stepMap.set(nextBus, Math.min(stepMap.get(nextBus) ?? Infinity, step + 1));
    }
  }
  return ans === Infinity ? -1 : ans;
}
console.log(numBusesToDestination([[1], [15, 16, 18], [10], [3, 4, 12, 14]], 3, 15));

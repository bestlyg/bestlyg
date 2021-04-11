import { structures } from '../utils';

const { Heap } = structures;
function getNumberOfBacklogOrders(orders: number[][]): number {
  const buyHeap = new Heap<number[]>(([t1], [t2]) => t1 - t2);
  const sellHeap = new Heap<number[]>(([t1], [t2]) => t2 - t1);
  const add = (order: number[]) => {
    (order[2] === 0 ? buyHeap : sellHeap).add(order);
    while (buyHeap.size > 0 && sellHeap.size > 0 && buyHeap.top[0] >= sellHeap.top[0]) {
      const buyTop = buyHeap.top;
      const sellTop = sellHeap.top;
      if (buyTop[1] > sellTop[1]) {
        sellHeap.remove();
        buyTop[1] -= sellTop[1];
      } else if (buyTop[1] < sellTop[1]) {
        buyHeap.remove();
        sellTop[1] -= buyTop[1];
      } else {
        sellHeap.remove();
        buyHeap.remove();
      }
    }
  };
  orders.forEach(order => add(order));
  let ans = 0;
  for (const [, c] of buyHeap) ans += c;
  for (const [, c] of sellHeap) ans += c;
  return ans % (10 ** 9 + 7);
}
console.log(
  getNumberOfBacklogOrders([
    [7, 1000000000, 1],
    [15, 3, 0],
    [5, 999999995, 0],
    [5, 1, 1],
  ])
);

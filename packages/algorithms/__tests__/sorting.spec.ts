import { Comparator } from '@bestlyg/shared';
import { random } from 'lodash';
import { quickSort1, quickSort2, quickSort3, mergeSort, heapSort } from '../src';
const compare = (a, b) => a - b;
const run = (sort: (compare: Comparator<number>, list: number[], ...args: any) => void) => {
  test('common sort', () => {
    const RANDOM_BASE = 100;
    const list = new Array(RANDOM_BASE).fill(0).map(_ => random(0, RANDOM_BASE));
    sort(compare, list);
    let f = true;
    for (let i = 1; i < RANDOM_BASE; i++) {
      if (list[i - 1] > list[i]) {
        f = false;
        break;
      }
    }
    expect(f).toBeTruthy();
  });
};
[quickSort1, quickSort2, quickSort3, mergeSort, heapSort].forEach(v => run(v));

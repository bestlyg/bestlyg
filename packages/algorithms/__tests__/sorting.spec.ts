import { Comparator } from '@bestlyg/shared';
import { random } from 'lodash';
import { sorting } from '../src';
const RANDOM_BASE = 100;
const compare = (a, b) => a - b;
const getList = () => new Array(RANDOM_BASE).fill(0).map(_ => random(0, RANDOM_BASE));
const compareRun = (sort: (compare: Comparator<number>, list: number[], ...args: any) => void) => {
  test('common sort', () => {
    const list = getList();
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
const numberRun = (sort: (list: number[]) => void) => {
  test('common sort', () => {
    const list = getList();
    sort(list);
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
describe('Sort', () => {
  [
    sorting.quickSort1,
    sorting.quickSort2,
    sorting.quickSort3,
    sorting.mergeSort,
    sorting.heapSort,
    sorting.bubbleSort,
  ].forEach(v => compareRun(v));
  [sorting.countingSort, sorting.radixSort].forEach(v => numberRun(v));
});

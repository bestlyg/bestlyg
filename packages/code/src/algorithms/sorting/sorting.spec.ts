import { Comparator } from '@/shared';
import { random } from 'lodash';
import { bubbleSort } from './bubbleSort';
import { countingSort } from './countingSort';
import { heapSort } from './heapSort';
import { mergeSort } from './mergeSort';
import { quickSort1, quickSort2, quickSort3 } from './quickSort';
import { radixSort } from './radixSort';
const RANDOM_BASE = 100;
const compare = (a, b) => a - b;
const getList = () => new Array(RANDOM_BASE).fill(0).map((_) => random(0, RANDOM_BASE));
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
    [quickSort1, quickSort2, quickSort3, mergeSort, heapSort, bubbleSort].forEach((v) =>
        compareRun(v),
    );
    [countingSort, radixSort].forEach((v) => numberRun(v));
});

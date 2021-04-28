import { ERROR_EMPTY_ELEMENT } from '@bestlyg/shared';
import { BinaryHeap } from '../../src';
import { random } from 'lodash';
describe('BinaryHeap', () => {
  test('add', () => {
    const heap = new BinaryHeap<number>((t1, t2) => t1 - t2);
    heap.add(100);
    for (let i = 0; i < 10; i++) heap.add(random(0, 90));
    expect(heap.top()).toBe(100);
  });
  describe('remove', () => {
    test('common', () => {
      const heap = new BinaryHeap<number>((t1, t2) => t1 - t2);
      heap.add(100);
      heap.add(90);
      heap.add(80);
      for (let i = 0; i < 10; i++) heap.add(random(0, 60));
      expect(heap.remove()).toBe(100);
      expect(heap.remove()).toBe(90);
      expect(heap.remove()).toBe(80);
    });
    test('random', () => {
      const heap = new BinaryHeap<number>((t1, t2) => t1 - t2);
      for (let i = 0; i < 20; i++) heap.add(random(0, 60));
      const arr: number[] = [];
      while (heap.size !== 0) arr.push(heap.remove());
      let f = false;
      for (let i = 1, l = arr.length; i < l; i++)
        if (arr[i] > arr[i - 1]) {
          f = true;
          break;
        }
      expect(f).toBeFalsy();
    });
  });

  test('checkRange', () => {
    const heap = new BinaryHeap<number>((t1, t2) => t1 - t2);
    const errorStr = `RangeError: ${ERROR_EMPTY_ELEMENT}`;
    try {
      heap.remove();
    } catch (error) {
      expect(error.toString()).toBe(errorStr);
    }
    try {
      heap.top();
    } catch (error) {
      expect(error.toString()).toBe(errorStr);
    }
  });
});

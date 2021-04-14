import { ERROR_EMPTY_ELEMENT } from '@bestlyg/shared';
import { Queue } from '../src';
describe('Queue', () => {
  test('size', () => {
    const queue = new Queue<number>();
    queue.enQueue(1);
    expect(queue.size).toBe(1);
    queue.enQueue(2);
    expect(queue.size).toBe(2);
  });
  test('deQueue', () => {
    const queue = new Queue<number>();
    queue.enQueue(1);
    queue.enQueue(2);
    expect(queue.deQueue()).toBe(1);
  });
  test('top', () => {
    const queue = new Queue<number>();
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);
    expect(queue.top()).toBe(1);
  });
  test('checkRange', () => {
    const queue = new Queue<number>();
    const errorStr = `RangeError: ${ERROR_EMPTY_ELEMENT}`;
    try {
      queue.deQueue();
    } catch (error) {
      expect(error.toString()).toBe(errorStr);
    }
    try {
      queue.top();
    } catch (error) {
      expect(error.toString()).toBe(errorStr);
    }
  });
});

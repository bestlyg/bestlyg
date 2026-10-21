import { describe, test, expect } from '@rstest/core';
import { Queue } from './queue';
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
        const error = new RangeError(`空元素`);
        expect(() => queue.deQueue()).toThrow(error);
        expect(() => queue.top()).toThrow(error);
    });
});

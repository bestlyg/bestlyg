import { describe, test, expect } from '@rstest/core';
import { Stack } from './stack';
import { ERROR_EMPTY_ELEMENT } from '@/shared';

describe('Stack', () => {
    test('size', () => {
        const stack = new Stack<number>();
        stack.push(1);
        expect(stack.size).toBe(1);
        stack.push(2);
        expect(stack.size).toBe(2);
    });
    test('pop', () => {
        const stack = new Stack<number>();
        stack.push(1);
        stack.push(2);
        expect(stack.pop()).toBe(2);
    });
    test('top', () => {
        const stack = new Stack<number>();
        stack.push(1);
        stack.push(2);
        expect(stack.top()).toBe(2);
    });
    test('checkRange', () => {
        const queue = new Stack<number>();
        const error = new RangeError(`${ERROR_EMPTY_ELEMENT}`);
        expect(() => queue.pop()).toThrow(error);
        expect(() => queue.top()).toThrow(error);
    });
});

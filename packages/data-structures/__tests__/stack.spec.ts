import { ERROR_EMPTY_ELEMENT } from '@bestlyg/shared';
import { Stack } from '../src';

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
    const errorStr = `RangeError: ${ERROR_EMPTY_ELEMENT}`;
    try {
      queue.pop();
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

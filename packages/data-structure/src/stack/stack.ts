import { ErrorEnum, ERROR_EMPTY_ELEMENT, throwError } from '@bestlyg/shared';

export interface IStack<T> {
  /** 栈内元素数量 */
  size: number;
  /** 栈顶元素 */
  top(): T;
  /** 入栈 */
  push(val: T): void;
  /** 出栈 */
  pop(): T;
}
export class Stack<T> implements IStack<T> {
  private list: T[] = [];
  get size() {
    return this.list.length;
  }
  top(): T {
    this.checkRange();
    return this.list[this.size - 1];
  }
  push(val: T): void {
    this.list.push(val);
  }
  pop(): T {
    this.checkRange();
    return this.list.pop()!;
  }
  private checkRange() {
    if (this.size === 0) {
      throwError(ERROR_EMPTY_ELEMENT, ErrorEnum.range);
    }
  }
}

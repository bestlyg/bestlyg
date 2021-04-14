import { ErrorEnum, ERROR_EMPTY_ELEMENT, throwError } from '@bestlyg/shared';

export interface IQueue<T> {
  /** 队列长度 */
  size: number;
  /** 队列头部元素 */
  top(): T;
  /** 入队 */
  enQueue(val: T): void;
  /** 出队 */
  deQueue(): T;
}
export class Queue<T> implements IQueue<T> {
  private list: T[] = [];
  get size() {
    return this.list.length;
  }
  top(): T {
    this.checkRange() || throwError(ERROR_EMPTY_ELEMENT, ErrorEnum.range);
    return this.list[0];
  }
  enQueue(val: T): void {
    this.list.push(val);
  }
  deQueue(): T {
    this.checkRange() || throwError(ERROR_EMPTY_ELEMENT, ErrorEnum.range);
    return this.list.shift();
  }
  private checkRange() {
    return this.size > 0;
  }
}

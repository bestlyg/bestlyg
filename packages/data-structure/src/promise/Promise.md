---
title: Promise
order: 1
nav:
  title: 数据结构
  path: /data-structure
  order: 2
group:
  title: 手写JavaScript
  path: /javascript
  order: 1
---

# Promise

> 参考文档地址  
> [阮一峰 ES6](https://es6.ruanyifeng.com/#docs/promise)  
> [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

ES6 增加的异步编程方式，避免了回调地狱，一个 promise 有三个状态 pending，fulfilled，rejected，初始化后为 pending 状态，在构造函数中会传入 resolve,reject 两个函数，调用 resolve 后改变状态为 fulfilled，调用 rejected 后改变状态为 rejected，一旦状态从 pending 进行转遍后不会再次转遍。调用 then 函数，返回新的 promise，以此从无限回调转换为链式调用，then 过多时又会陷入链式地狱。

## 代码

- promise.ts

```ts
import { resolvePromise } from './resolvePromise';
import {
  asyncState,
  PromiseState,
  BestPromiseFulfilledResult,
  BestPromiseRejectedResult,
  DEFAULT_OP,
  catchError,
  ANY_FN,
  throwValue,
} from './utils';
export class BestPromise<T> {
  /** 状态值 */
  private state: PromiseState = PromiseState.PENDING;
  /** 成功回调 */
  private onFulfilled: (() => void)[] = [];
  /** 失败回调 */
  private onRejected: (() => void)[] = [];
  /** 结束回调 */
  private onFinally: (() => void)[] = [];
  private value!: T;
  private reason!: any;
  constructor(fn: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    catchError(() => fn(this.resolve, this.reject), this.reject);
  }
  /**
   * 返回成功状态
   * @param val 成功值
   */
  static resolve<V>(val: V) {
    return new BestPromise<V>(resolve => {
      resolve(val);
    });
  }
  /**
   * 返回失败状态
   * @param val 失败值
   */
  static reject(val: any) {
    return new BestPromise<any>((_, reject) => {
      reject(val);
    });
  }
  /**
   * 任意一个promise状态变更，返回的promise就会状态变更
   * @param promises promise列表
   */
  static race(promises: BestPromise<any>[]) {
    return new BestPromise((resolve, reject) => {
      for (const promise of promises) {
        promise.then(
          value => resolve(value),
          reason => reject(reason)
        );
      }
    });
  }
  /**
   * 任意一个promise状态变更为fulfilled，返回resolve，
   * 所有promise状态变更为rejected，返回reject列表
   * @param promises promise列表
   */
  static any(promises: BestPromise<any>[]) {
    const len = promises.length;
    let count = 0;
    const reasonList: any[] = [];
    return new BestPromise((resolve, reject) => {
      const onReject = (reason: any, index: number) => {
        reasonList[index] = reason;
        if (++count === len) reject(reasonList);
      };
      for (let i = 0; i < len; i++) {
        const promise = promises[i];
        promise.then(
          value => resolve(value),
          reason => onReject(reason, i)
        );
      }
    });
  }
  /**
   * 任意一个promise状态变更为rejected，返回reject
   * 所有promise状态变更为fulfilled，返回resolve列表
   * @param promises promise列表
   */
  static all(promises: BestPromise<any>[]) {
    const len = promises.length;
    let count = 0;
    const value: any[] = [];
    return new BestPromise((resolve, reject) => {
      const onResolve = (reason: any, index: number) => {
        value[index] = reason;
        if (++count === len) resolve(value);
      };
      for (let i = 0; i < len; i++) {
        const promise = promises[i];
        promise.then(
          value => onResolve(value, i),
          reason => reject(reason)
        );
      }
    });
  }
  /**
   * 所有promise状态都变更时返回
   * @param promises promise列表
   */
  static allSettled(
    promises: BestPromise<any>[]
  ): BestPromise<(BestPromiseFulfilledResult<any> | BestPromiseRejectedResult)[]> {
    const len = promises.length;
    let count = 0;
    const statusList: (BestPromiseFulfilledResult<any> | BestPromiseRejectedResult)[] = [];
    return new BestPromise(resolve => {
      const on = (
        status: BestPromiseFulfilledResult<any> | BestPromiseRejectedResult,
        index: number
      ) => {
        statusList[index] = status;
        if (++count === len) resolve(statusList);
      };
      for (let i = 0; i < len; i++) {
        const promise = promises[i];
        promise.then(
          value => on({ status: 'fulfilled', value }, i),
          reason => on({ status: 'rejected', reason }, i)
        );
      }
    });
  }
  /**
   * 成功函数
   * @param value 成功值
   */
  private resolve(value: T): void {
    if (this.state === PromiseState.PENDING) {
      this.state = PromiseState.FULFILLED;
      this.value = value;
      this.onFulfilled.forEach(fn => fn());
      this.onFinally.forEach(fn => fn());
    }
  }
  /**
   * 失败函数
   * @param reason 失败值
   */
  private reject(reason: any): void {
    if (this.state === PromiseState.PENDING) {
      this.state = PromiseState.REJECTED;
      this.reason = reason;
      this.onRejected.forEach(fn => fn());
      this.onFinally.forEach(fn => fn());
    }
  }
  /**
   * 链式调用函数，返回新的promise
   * @param onFulfilled 成功时触发
   * @param onRejected 失败时触发
   */
  then<V>(
    onFulfilled: (value: T) => V | BestPromise<V>,
    onRejected: (reason: any) => any = throwValue
  ): BestPromise<V> {
    const promise = new BestPromise<V>((resolve, reject) => {
      // 统一触发函数
      const onFn = (val?: V | BestPromise<V>) =>
        val !== undefined && asyncState(() => resolvePromise<V>(promise, val, resolve, reject));
      const onFulfill = () => onFn(catchError(() => onFulfilled(this.value), reject));
      const onReject = () => onFn(catchError(() => onRejected(this.reason), reject));
      if (this.state === PromiseState.FULFILLED) {
        // 如果当前状态已为fulfill则直接触发
        onFulfill();
      } else if (this.state === PromiseState.REJECTED) {
        // 如果当前状态已为reject则直接触发
        onReject();
      } else {
        // 如果当前状态还未确定则暂存函数
        this.onFulfilled.push(onFulfill);
        this.onRejected.push(onReject);
      }
    });
    return promise;
  }
  /**
   * 捕获错误，可捕获error错误或者reject
   * @param onReject 任意函数
   */
  catch(onReject: (reason: any) => any) {
    return this.then(DEFAULT_OP, onReject);
  }
  /**
   * 在promise执行完毕后执行
   * @param fn 任意函数
   */
  finally(fn: ANY_FN): void {
    this.state === PromiseState.PENDING ? this.onFinally.push(fn) : fn();
  }
}
```

- resolvePromise.ts

```ts
import { ErrorEnum, isFunction, throwError } from '@/utils';
import { BestPromise } from './promise';
import { isBestPromise } from './utils';
/**
 * 用来处理then方法返回结果包装成promise 方便链式调用
 * @param promise then方法执行产生的promise 方便链式调用
 * @param x then方法执行完成功回调或者失败回调后的result
 * @param resolve 返回的promise的resolve方法 用来更改promise最后的状态
 * @param reject 返回的promise的reject方法 用来更改promise最后的状态
 */
export function resolvePromise<T>(
  promise: BestPromise<T>,
  x: any,
  resolve: (value: T) => void,
  reject: (reason: any) => void
): void {
  try {
    // 首先判断x和promise2是否是同一引用 如果是 那么就用一个类型错误作为Promise2的失败原因reject
    /* istanbul ignore next */
    if (promise === x) throwError('循环引用了!', ErrorEnum.type);
    else {
      // called 用来记录promise的状态改变，一旦发生改变了 就不允许 再改成其他状态
      let called = false;
      // 如果x是一个对象或者函数 那么他就有可能是promise 需要注意 null typeof也是 object 所以需要排除掉
      // 先获得x中的then 如果这一步发生异常了，那么就直接把异常原因reject掉
      if (isBestPromise(x)) {
        x.then(
          y => {
            /* istanbul ignore next */
            if (!called) {
              called = true;
              resolvePromise(promise, y, resolve, reject);
            }
          },
          error => {
            /* istanbul ignore next */
            if (!called) {
              called = true;
              reject(error);
            }
          }
        );
      } else if (isFunction(x)) {
        throwError('返回值请不要传递非Promise函数!', ErrorEnum.type);
      } else {
        resolve(x);
      }
    }
  } catch (error) {
    reject(error);
  }
}
```

- utils.ts

```ts
import { BestPromise } from './promise';

export const isBestPromise = (val: unknown): val is BestPromise<unknown> =>
  val instanceof BestPromise;
export const asyncState = (fn: () => void) => setTimeout(fn, 0);
export enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}
export interface BestPromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

export interface BestPromiseRejectedResult {
  status: 'rejected';
  reason: any;
}
export function catchError<T>(
  fn: (...vals: any) => T,
  errorFn: (reason: Error) => void,
  ...args: any[]
) {
  try {
    return fn.apply(fn, args);
  } catch (e) {
    errorFn(e);
  }
}

export const DEFAULT_OP: <T>(val: T) => T = val => val;

export type ANY_FN = (...vals: any) => any;

export function throwValue(val: unknown): never {
  throw val;
}
```

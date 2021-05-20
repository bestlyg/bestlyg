---
title: Promise
nav:
  title: 数据结构
  path: /data-structures
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


## [核心代码](https://gitee.com/bestlyg/bestlyg/tree/master/packages/data-structures/src/javascript/promise/promise.ts)
```ts
import { DEFAULT_OP, catchError, throwValue } from '@bestlyg/shared';
import { resolvePromise } from './resolvePromise';
import {
  asyncState,
  PromiseState,
  BestPromiseFulfilledResult,
  BestPromiseRejectedResult,
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
  finally(fn: () => void): void {
    this.state === PromiseState.PENDING ? this.onFinally.push(fn) : fn();
  }
}

```
        
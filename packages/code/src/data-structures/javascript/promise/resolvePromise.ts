import { ErrorEnum, throwError } from '@/shared';
import { BestPromise } from './promise';
import { isBestPromise } from './utils';
import { isFunction } from 'lodash';

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

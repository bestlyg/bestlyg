/**
 * 防抖
 */
export const debounce = (time: number) => {
  let timeout: NodeJS.Timeout;
  return (fn: (...args: any[]) => void) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(fn, time);
  };
};
/**
 * 节流
 */
export const throttle = (time: number) => {
  let run = false;
  return (fn: (...args: any[]) => void) => {
    if (run) return;
    run = true;
    setTimeout(() => {
      fn();
      run = false;
    }, time);
  };
};
/**
 * 新建对象实例
 */
export const newInstance = (fn: () => object, ...args: unknown[]) => {
  const instance = Object.create(fn.prototype);
  const res = fn.apply(instance, args);
  return res instanceof Object ? res : instance;
};

/**
 * 防抖
 */
export const debounce = (time: number) => {
    let timeout: NodeJS.Timeout;
    return (fn: (...args: any[]) => void) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(fn, time) as any;
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
export const newInstance = (fn: (...args: any[]) => any, ...args: unknown[]) => {
    const instance = Object.create(fn.prototype);
    const res = fn.apply(instance, args);
    return res instanceof Object ? res : instance;
};
/**
 * 随机值[a,b]
 * @param min 最小值
 * @param max 最大值
 */
export function random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

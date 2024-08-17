import { path } from 'zx';
import { fileURLToPath } from 'url';
import { PREFIX } from './base';

export function tryToNumber(s: string, defaultValue: number): number {
    const num = Number(s);
    return Number.isNaN(num) ? defaultValue : num;
}

export function getEnv(s: string) {
    return process.env[`${PREFIX}_${s}`];
}

export function getResolveFunction(dirname: string, upTimes?: number): (...p: string[]) => string;
export function getResolveFunction(
    importMeta: ImportMeta,
    upTimes?: number
): (...p: string[]) => string;
export function getResolveFunction(
    meta: ImportMeta | string,
    upTimes = 0
): (...p: string[]) => string {
    let dirname: string;
    if (typeof meta === 'string') {
        dirname = meta;
    } else if (meta.dirname) {
        dirname = meta.dirname;
    } else {
        dirname = path.dirname(fileURLToPath(meta.url));
    }
    return function resolve(...p: string[]) {
        return path.resolve(dirname, ...new Array(upTimes).fill('..'), ...p);
    };
}

export const resolve = getResolveFunction(__dirname, 3);

export function mount<O, T>(base: O, mountRecord: T) {
    const result = base as O & T;
    for (const [k, v] of Object.entries(mountRecord)) {
        result[k] = v;
    }
    return result;
}

export function sleep<T = void>(t: number, v: T) {
    return new Promise(r => {
        setTimeout(() => {
            r(v);
        }, t);
    });
}

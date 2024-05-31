import { path } from 'zx';

export function tryToNumber(s: string, defaultValue: number): number {
    const num = Number(s);
    return Number.isNaN(num) ? defaultValue : num;
}

export function getEnv(s: string) {
    return process.env[`CSCET_${s}`];
}

export function resolve(...p: string[]) {
    return path.resolve(__dirname, ...new Array(3).fill('..'), ...p);
}

export function mount<O, T>(base: O, mountRecord: T) {
    const result = base as O & T;
    for (const [k, v] of Object.entries(mountRecord)) {
        result[k] = v;
    }
    return result;
}

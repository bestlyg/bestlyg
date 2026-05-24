import { path } from 'zx';

export function tryToNumber(s: string | undefined, defaultValue: number): number {
    const num = Number(s);
    return Number.isNaN(num) ? defaultValue : num;
}

export function getEnv(s: string) {
    return process.env[`CSCET_${s}`];
}

export function resolve(...p: string[]) {
    return path.resolve(__dirname, ...new Array(3).fill('..'), ...p);
}

export function mount<O extends object, T extends object>(base: O, mountRecord: T): O & T {
    return Object.assign(base, mountRecord);
}

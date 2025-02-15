import path from 'node:path';
import { fileURLToPath } from 'url';
import { PREFIX } from './base';

export function getEnv(s: string) {
    return process.env[`${PREFIX}_${s}`];
}

export function getResolveFunction(dirname: string, upTimes?: number): (...p: string[]) => string;
export function getResolveFunction(
    importMeta: ImportMeta,
    upTimes?: number,
): (...p: string[]) => string;
export function getResolveFunction(
    meta: ImportMeta | string,
    upTimes = 0,
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

export const resolve =
    typeof globalThis.__dirname !== 'undefined'
        ? getResolveFunction(__dirname, 3)
        : getResolveFunction(import.meta, 3);

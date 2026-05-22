import path from 'node:path';
import { getDirname } from 'metadata-file';
import { PREFIX } from './base';

export function getEnv(s: string) {
    return process.env[`${PREFIX}_${s}`];
}

export function getResolveFunction(dirname: string, upTimes = 0): (...p: string[]) => string {
    return function resolve(...p: string[]) {
        return path.resolve(dirname, ...new Array(upTimes).fill('..'), ...p);
    };
}

export const resolve = getResolveFunction(getDirname(), 3);

import { path } from 'zx';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

let packageRoot = path.dirname(fileURLToPath(import.meta.url));
while (!existsSync(path.join(packageRoot, 'package.json'))) {
    const parent = path.dirname(packageRoot);
    if (parent === packageRoot) throw new Error('Cannot locate cscet package.json');
    packageRoot = parent;
}

export function tryToNumber(s: string | undefined, defaultValue: number): number {
    const num = Number(s);
    return Number.isNaN(num) ? defaultValue : num;
}

export function getEnv(s: string) {
    return process.env[`CSCET_${s}`];
}

export function resolve(...p: string[]) {
    return path.resolve(packageRoot, ...p);
}

export function mount<O extends object, T extends object>(base: O, mountRecord: T): O & T {
    return Object.assign(base, mountRecord);
}

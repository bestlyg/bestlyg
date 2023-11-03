import path from 'path';
import fs from 'fs-extra';
import { print } from '../utils';
import { merge } from 'lodash';
import _ from 'lodash';

export const resolve = (...p: string[]) => path.resolve(__dirname, '../..', ...p);

export const replaceFileExt = (p: string, ext: string) => p.replace(path.extname(p), ext);

export function error(msg: string, ...errs: any[]): never {
    print.error(msg);
    errs.forEach(err => console.error(err));
    process.exit(1);
}

export type Config<T> = T | ((config: T) => T);
export function transformConfig<T>(paths: string[]): Config<T>[] {
    const res: Config<T>[] = [];
    for (const p of paths) {
        if (!fs.existsSync(p) || !fs.statSync(p).isFile()) continue;
        try {
            const name = path.basename(p);
            if (name === '.json') {
                const config = fs.readFileSync(p).toString();
                res.push(JSON.parse(config));
            } else if (name === '.js') {
                const config = require(p);
                if (
                    typeof config === 'function' ||
                    (typeof config === 'object' && config !== null)
                ) {
                    res.push(config);
                }
            } else {
                error(`Unknown Config Path.`);
            }
        } catch (err) {
            error(`Transform Config Error.`, err);
        }
    }
    return res;
}

export function mergeConfig<T>(config: T, configs: Config<T>[]) {
    for (const cfg of configs) {
        if (typeof cfg === 'function') {
            config = (cfg as Function)(config);
        } else {
            config = merge(config, cfg);
        }
    }
    return config;
}

import { resolve as pathResolve } from '../../utils';
import { TsConfig } from './interface';
import { config } from './config';
import { exec } from 'child_process';

export interface TransformProps {
    entry: string;
    transformConfig?: (config: TsConfig) => TsConfig;
}

function config2Option(config: TsConfig) {
    return Object.entries(config)
        .map(([k, v]) => {
            let s = `--${k} `;
            if (v === true) return s;
            else if (v === false) return '';
            else s += v;
            return s;
        })
        .join(' ');
}

const tsc = pathResolve('node_modules/.bin/tsc');

export function transform({ entry, transformConfig }: TransformProps) {
    const cmd = `${tsc} ${entry} ${config2Option(transformConfig?.(config) ?? config)}`;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}
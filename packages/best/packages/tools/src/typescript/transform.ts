import ts from 'typescript';
import path from 'node:path';
import { TsConfig } from './interface';
import { config } from './config';
import { execSync, exec } from 'node:child_process';

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

export function transformSync({ entry, transformConfig }: TransformProps) {
    const cmd = `tsc ${entry} ${config2Option(transformConfig?.(config) ?? config)}`;
    return execSync(cmd, {
        stdio: 'inherit',
    });
}

export function transformAsync({ entry, transformConfig }: TransformProps) {
    const cmd = `tsc ${entry} ${config2Option(transformConfig?.(config) ?? config)}`;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout) => {
            console.log(error)
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

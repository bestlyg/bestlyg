import { resolve as pathResolve } from '../utils';
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

const tsc = pathResolve('node_modules/.bin/tsc');

export function transformSync({ entry, transformConfig }: TransformProps) {
    const cmd = `${tsc} ${entry} ${config2Option(transformConfig?.(config) ?? config)}`;
    return execSync(cmd, {
        stdio: 'inherit',
    });
}

export function transformAsync({ entry, transformConfig }: TransformProps) {
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

// '/Users/bytedance/projects/bestlyg/packages/best/components/button/node_modules/.bin
// /Users/bytedance/Library/pnpm/global/5/.pnpm/pnpm@8.6.2/node_modules/pnpm/dist/node-gyp-bin
// /Users/bytedance/projects/bestlyg/node_modules/.bin
// /Users/bytedance/Library/pnpm/nodejs/18.17.0/bin
// /Library/Frameworks/Python.framework/Versions/3.11/bin
// /usr/local/bin
// /System/Cryptexes/App/usr/bin
// /usr/bin
// /bin
// /usr/sbin
// /sbin
// /opt/puppetlabs/bin
// /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin
// /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin
// /var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin
// /Users/bytedance/Library/pnpm
// /Library/Frameworks/Python.framework/Versions/3.11/bin
// /Users/bytedance/.cargo/bin
// /Users/bytedance/projects/bestlyg/packages/best/packages/tools/node_modules/.bin'

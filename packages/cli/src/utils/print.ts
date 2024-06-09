import { chalk } from 'zx';
import { PREFIX } from './base';
import { mount } from './functions';

function log(...args: any[]) {
    console.log(...args);
}

function _print(color, ...args) {
    if (args.length > 1) {
        log(
            chalk[`bg${color.replace(/^\w/, w => w.toUpperCase())}`](` ${args[0]} `),
            chalk[color](args.slice(1))
        );
    } else {
        log(chalk[color](...args));
    }
}

function list(info: Record<string, any>) {
    const entries = Object.entries(info).filter(([, v]) => v !== undefined);
    const padEndLength = Math.max(...entries.map(([k]) => k.length)) + 1;
    for (const [k, v] of entries) {
        print.info(`${k.padEnd(padEndLength)}: ${v}`);
    }
}
/**
 * Print divider
 * @param {'info' | 'warn' | 'success' | 'error'} level
 */
function divider(level = 'info') {
    const logger = print[level] ?? print.info;
    logger('-'.repeat(process.stdout.columns - PREFIX.length - 3));
}
function errorWithStack(msg: string, ...errors: any[]) {
    print.error(msg);
    for (const err of errors) {
        if (err instanceof Error) {
            console.error(err);
        } else {
            print.error(err);
        }
    }
}
export const print = mount(_print, {
    info: _print.bind(null, 'gray', PREFIX) as typeof _print,
    warn: _print.bind(null, 'yellow', PREFIX) as typeof _print,
    error: _print.bind(null, 'red', PREFIX) as typeof _print,
    success: _print.bind(null, 'green', PREFIX) as typeof _print,
    log,
    chalk,
    divider,
    list,
    errorWithStack,
});

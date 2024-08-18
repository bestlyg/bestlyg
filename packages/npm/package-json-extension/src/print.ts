import chalk from 'chalk';
import { PREFIX } from './constants';

function log(...args) {
    console.log(...args);
}

function _print(color, ...args) {
    if (args.length > 1) {
        log(
            chalk[`bg${color.replace(/^\w/, w => w.toUpperCase())}`](` ${args[0]} `),
            chalk[color](args.slice(1)),
        );
    } else {
        log(chalk[color](...args));
    }
}
/**
 * Print divider
 * @param {'info' | 'warn' | 'success' | 'error'} level
 */
function divider(level = 'info') {
    const logger = print[level] || print.info;
    logger(
        '---------------------------------------------------------------------------------------',
    );
}

export const print = _print as typeof _print & {
    info: typeof _print;
    warn: typeof _print;
    error: typeof _print;
    success: typeof _print;
    log: typeof log;
    chalk: typeof chalk;
    divider: typeof divider;
};

print.info = _print.bind(null, 'gray', PREFIX);
print.warn = _print.bind(null, 'yellow', PREFIX);
print.error = _print.bind(null, 'red', PREFIX);
print.success = _print.bind(null, 'green', PREFIX);
print.log = log;
print.chalk = chalk;
print.divider = divider;

export function error(msg: string, ...errs: any[]): never {
    print.error(msg);
    errs.forEach(err => console.error(err));
    process.exit(1);
}

import chalk from 'chalk';
import { PREFIX } from './constants';
import { mount } from './functions';

type PrintColor = 'gray' | 'yellow' | 'red' | 'green';
type PrintFunction = (color: PrintColor, ...args: unknown[]) => void;

const colorMap = {
    gray: chalk.gray,
    yellow: chalk.yellow,
    red: chalk.red,
    green: chalk.green,
} satisfies Record<PrintColor, (message: string) => string>;

const bgColorMap = {
    gray: chalk.bgGray,
    yellow: chalk.bgYellow,
    red: chalk.bgRed,
    green: chalk.bgGreen,
} satisfies Record<PrintColor, (message: string) => string>;

function log(...args: any[]) {
    console.log(...args);
}

function stringifyPrintValue(value: unknown) {
    return typeof value === 'string' ? value : JSON.stringify(value);
}

const _print: PrintFunction = (color, ...args) => {
    if (args.length > 1) {
        log(
            bgColorMap[color](` ${stringifyPrintValue(args[0])} `),
            colorMap[color](args.slice(1).map(stringifyPrintValue).join(' ')),
        );
    } else {
        log(colorMap[color](args.map(stringifyPrintValue).join(' ')));
    }
};

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
    const logger = print[level as keyof typeof print] ?? print.info;
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
    info: _print.bind(null, 'gray', PREFIX) as (...args: unknown[]) => void,
    warn: _print.bind(null, 'yellow', PREFIX) as (...args: unknown[]) => void,
    error: _print.bind(null, 'red', PREFIX) as (...args: unknown[]) => void,
    success: _print.bind(null, 'green', PREFIX) as (...args: unknown[]) => void,
    log,
    chalk,
    divider,
    list,
    errorWithStack,
});

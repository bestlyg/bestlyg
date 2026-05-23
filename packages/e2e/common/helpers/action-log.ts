import chalk from 'chalk';
import { createConsola } from 'consola';
import ora from 'ora';

export interface E2EActionValueLogOptions {
    maskValue?: boolean;
}

type E2ELogKind = 'spec' | 'test' | 'step' | 'action';
type E2ELogColor = 'cyan' | 'magenta' | 'blue' | 'green' | 'yellow' | 'red';
type E2ELogRenderOptions = {
    symbol?: string;
    color?: (text: string) => string;
    oraColor?: E2ELogColor;
};

const MAX_LOG_VALUE_LENGTH = 120;
const e2eLogger = createConsola();

const LOG_KIND_CONFIG = {
    spec: {
        label: 'SPEC',
        indent: '',
        symbol: chalk.cyan('◆'),
        color: chalk.cyan.bold,
        oraColor: 'cyan',
    },
    test: {
        label: 'TEST',
        indent: '  ',
        symbol: chalk.magenta('●'),
        color: chalk.magenta.bold,
        oraColor: 'magenta',
    },
    step: {
        label: 'STEP',
        indent: '    ',
        symbol: chalk.blue('▶'),
        color: chalk.blue,
        oraColor: 'blue',
    },
    action: {
        label: 'ACTION',
        indent: '      ',
        symbol: chalk.green('•'),
        color: chalk.green,
        oraColor: 'green',
    },
} as const satisfies Record<
    E2ELogKind,
    {
        label: string;
        indent: string;
        symbol: string;
        color: (text: string) => string;
        oraColor: E2ELogColor;
    }
>;

export function formatE2EActionValue(value: string, options: E2EActionValueLogOptions = {}) {
    if (options.maskValue) {
        return '******';
    }

    if (value.length <= MAX_LOG_VALUE_LENGTH) {
        return value;
    }

    return `${value.slice(0, MAX_LOG_VALUE_LENGTH)}...`;
}

function renderE2ELog(kind: E2ELogKind, message: string, options: E2ELogRenderOptions = {}) {
    const config = LOG_KIND_CONFIG[kind];
    const label = chalk.dim(`[E2E:${config.label}]`);
    const color = options.color ?? config.color;

    return {
        symbol: options.symbol ?? config.symbol,
        text: `${config.indent}${label} ${color(message)}`,
        oraColor: options.oraColor ?? config.oraColor,
    };
}

function logE2EEvent(kind: E2ELogKind, message: string, options?: E2ELogRenderOptions) {
    const { symbol, text, oraColor } = renderE2ELog(kind, message, options);

    if (process.stdout.isTTY) {
        ora({ text, color: oraColor, stream: process.stdout, discardStdin: false })
            .start()
            .stopAndPersist({
                symbol,
                text,
            });
        return;
    }

    e2eLogger.log(`${symbol} ${text}`);
}

export function logE2ESpec(message: string) {
    logE2EEvent('spec', message);
}

export function logE2ETest(message: string) {
    logE2EEvent('test', message);
}

export function logE2EStep(message: string) {
    logE2EEvent('step', message);
}

export function logE2EAction(message: string) {
    logE2EEvent('action', message);
}

export function logE2EActionWarning(message: string) {
    logE2EEvent('action', `警告：${message}`, {
        symbol: chalk.yellow('!'),
        color: chalk.yellow,
        oraColor: 'yellow',
    });
}

export function logE2EActionError(message: string) {
    logE2EEvent('action', `错误：${message}`, {
        symbol: chalk.red('×'),
        color: chalk.red,
        oraColor: 'red',
    });
}

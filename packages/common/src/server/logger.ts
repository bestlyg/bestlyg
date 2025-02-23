export type LoggerLevel = 'info' | 'warn' | 'success' | 'error';

export type Color = { open: string; close: string };

export const loggerColorMap: Record<LoggerLevel, { bg: Color; text: Color }> = {
    info: {
        bg: { open: '\x1B[100m', close: '\x1B[49m' },
        text: {
            open: '\x1B[90m',
            close: '\x1B[39m',
        },
    },
    warn: {
        bg: { open: '\x1B[43m', close: '\x1B[49m' },
        text: {
            open: '\x1B[33m',
            close: '\x1B[39m',
        },
    },
    error: {
        bg: { open: '\x1B[41m', close: '\x1B[49m' },
        text: {
            open: '\x1B[31m',
            close: '\x1B[39m',
        },
    },
    success: {
        bg: { open: '\x1B[42m', close: '\x1B[49m' },
        text: {
            open: '\x1B[32m',
            close: '\x1B[39m',
        },
    },
};

export class Logger {
    constructor(
        public prefix: string = 'LOGGER',
        public colorMap = loggerColorMap,
    ) {}

    log(...args: any[]) {
        console.log(...args);
    }

    info(...args: any[]) {
        return this.print('info', this.prefix, ...args);
    }

    warn(...args: any[]) {
        return this.print('warn', this.prefix, ...args);
    }

    success(...args: any[]) {
        return this.print('success', this.prefix, ...args);
    }

    error(...args: any[]) {
        return this.print('error', this.prefix, ...args);
    }

    print(level: LoggerLevel, ...args: any[]) {
        const { bg, text } = this.colorMap[level];
        this.log(`${bg.open} ${args[0]} ${bg.close} ${text.open}${args.slice(1)}${text.close}`);
    }

    list(info: Record<string, any>) {
        const entries = Object.entries(info).filter(([, v]) => v !== undefined);
        const padEndLength = Math.max(...entries.map(([k]) => k.length)) + 1;
        for (const [k, v] of entries) {
            this.info(`${k.padEnd(padEndLength)}: ${v}`);
        }
    }
    /**
     * Print divider
     */
    divider(level: LoggerLevel = 'info', char = '-') {
        this.print(
            level,
            this.prefix,
            char.repeat(process.stdout.columns - this.prefix.length - 3),
        );
    }

    errorWithStack(msg: string, ...errors: any[]) {
        this.error(msg);
        for (const err of errors) {
            if (err instanceof Error) {
                console.error(err);
            } else {
                this.error(err);
            }
        }
    }
}

import dayjs from 'dayjs';

/** Logger 支持的日志级别。 */
export type LoggerLevel = 'info' | 'warn' | 'success' | 'error';

/** ANSI 颜色片段。 */
export type Color = { open: string; close: string };

/** 默认终端颜色配置。 */
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

/** 带前缀、时间戳和颜色的轻量命令行 logger。 */
export class Logger {
    enableColor: boolean;
    enableTime: boolean;
    colorMap: typeof loggerColorMap;
    prefix: string;

    constructor({
        prefix = 'LOGGER',
        colorMap = loggerColorMap,
        enableColor = true,
        enableTime = true,
    }: {
        prefix?: Logger['prefix'];
        colorMap?: Logger['colorMap'];
        enableColor?: Logger['enableColor'];
        enableTime?: Logger['enableTime'];
    } = {}) {
        this.prefix = prefix;
        this.colorMap = colorMap;
        this.enableColor = enableColor;
        this.enableTime = enableTime;
    }

    /** 直接转发到 console.log，不额外格式化。 */
    log(...args: any[]) {
        console.log(...args);
    }

    /** 输出 info 级别日志。 */
    info(...args: any[]) {
        return this.print('info', this.prefix, ...args);
    }

    /** 输出 warn 级别日志。 */
    warn(...args: any[]) {
        return this.print('warn', this.prefix, ...args);
    }

    /** 输出 success 级别日志。 */
    success(...args: any[]) {
        return this.print('success', this.prefix, ...args);
    }

    /** 输出 error 级别日志。 */
    error(...args: any[]) {
        return this.print('error', this.prefix, ...args);
    }

    /** 按指定级别格式化并输出日志。 */
    print(level: LoggerLevel, ...args: any[]) {
        const { bg, text: textColor } = this.colorMap[level];
        const printItems: string[] = [];
        let prefix = args[0];
        if (this.enableColor) {
            prefix = `${bg.open} ${prefix} ${bg.close}`;
        }
        printItems.push(prefix);
        if (this.enableTime) {
            let time = dayjs().format('YYYY-MM-DD HH:mm:ss');
            if (this.enableColor) {
                time = `${bg.open} ${time} ${bg.close}`;
            }
            printItems.push(time);
        }
        let text = args.slice(1).join('');
        if (this.enableColor) {
            text = `${textColor.open}${text}${textColor.close}`;
        }
        printItems.push(text);
        this.log(printItems.join(' '));
    }

    /** 以对齐的 key/value 列表输出对象内容，跳过 undefined 值。 */
    list(info: Record<string, any>) {
        const entries = Object.entries(info).filter(([, v]) => v !== undefined);
        const padEndLength = Math.max(...entries.map(([k]) => k.length)) + 1;
        for (const [k, v] of entries) {
            this.info(`${k.padEnd(padEndLength)}: ${v}`);
        }
    }

    /**
     * 输出一条终端分隔线。
     */
    divider(level: LoggerLevel = 'info', char = '-') {
        this.print(
            level,
            this.prefix,
            char.repeat(process.stdout.columns - this.prefix.length - 3),
        );
    }

    /** 输出错误消息，并对 Error 实例额外打印 stack。 */
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

/** 默认 logger 实例。 */
export const logger = new Logger();

import chalk from 'chalk';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';
import { resolve } from './resolve';
import { getCurrentContext } from './storage';

type BestlygLogLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

export function createLoggerOptions({
    logPath = resolve('logs'),
    level = 'info',
    retentionDays = 30,
}: {
    logPath?: string;
    level?: BestlygLogLevel;
    retentionDays?: number;
} = {}): winston.LoggerOptions {
    function getExternalInfo() {
        const ctx = getCurrentContext();
        return {
            traceId: ctx?.traceId,
            username: ctx?.username,
        };
    }
    const timestamp = winston.format.timestamp();
    const appendExternalInfo = winston.format((info) => {
        Object.assign(info, getExternalInfo());
        return info;
    })();
    const commonDailyRotateFileConfig: DailyRotateFile.DailyRotateFileTransportOptions = {
        dirname: logPath, // 日志目录
        datePattern: 'YYYY-MM-DD', // 按天分割
        zippedArchive: false, // 压缩旧日志
        maxSize: '200m',
        maxFiles: `${retentionDays}d`,
        format: winston.format.combine(timestamp, appendExternalInfo, winston.format.json()),
        filename: 'common-%DATE%.log',
    };
    return {
        level,
        transports: [
            // 控制台输出
            new winston.transports.Console({
                format: winston.format.combine(
                    timestamp,
                    winston.format.printf(createTextLogFormatter({ color: true })),
                ),
            }),
            // 文件滚动日志
            new DailyRotateFile({
                ...commonDailyRotateFileConfig,
                filename: 'application-%DATE%.log',
            }),

            new DailyRotateFile({
                ...commonDailyRotateFileConfig,
                filename: 'console-%DATE%.log',
                format: winston.format.combine(
                    timestamp,
                    winston.format.printf(createTextLogFormatter({ color: false })),
                ),
            }),

            // 错误日志（单独文件）
            new DailyRotateFile({
                ...commonDailyRotateFileConfig,
                filename: 'error-%DATE%.log',
                level: 'error',
            }),
        ],
    };
}

function createTextLogFormatter({ color }: { color: boolean }) {
    return ({
        level,
        message,
        timestamp,
        context,
        stack,
    }: {
        level: string;
        message: unknown;
        timestamp?: unknown;
        context?: unknown;
        stack?: unknown;
    }) => {
        const colorByLevel: Record<string, (str: string) => string> = {
            error: chalk.red,
            warn: chalk.yellow,
            info: chalk.green,
            http: chalk.blue,
            verbose: chalk.cyan,
            debug: chalk.magenta,
            silly: chalk.gray,
        };
        const identity = (s: string) => s;
        const paint = color ? colorByLevel[level] || identity : identity;
        const clean = color ? identity : stripAnsi;
        return [
            color ? chalk.cyan('BEST') : 'BEST',
            color ? chalk.gray(`${timestamp}`) : `${timestamp}`,
            paint(level),
            context ? (color ? chalk.yellow(`[${context}]`) : `[${context}]`) : '',
            paint(clean(String(message ?? ''))),
            stack ? paint(clean(String(stack))) : '',
        ]
            .filter(Boolean)
            .join(' ');
    };
}

function stripAnsi(data: string) {
    return data.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');
}

import chalk from 'chalk';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { resolve } from './resolve';
// import { LOG_PATH, ROOT_PATH } from './constants';

export function createLoggerOptions({
    logPath = resolve('logs'),
}: { logPath?: string } = {}): winston.LoggerOptions {
    function getExternalInfo() {
        // const ctx = getCurrentContext();
        return {
            // traceId: ctx?.traceId,
            // username: ctx?.username,
            // domain: ctx?.domain,
        };
    }
    const timestamp = winston.format.timestamp();
    const commonDailyRotateFileConfig: DailyRotateFile.DailyRotateFileTransportOptions = {
        dirname: logPath, // 日志目录
        datePattern: 'YYYY-MM-DD', // 按天分割
        zippedArchive: false, // 压缩旧日志
        maxSize: '200m',
        maxFiles: '30d',
        format: winston.format.combine(
            timestamp,
            winston.format(info => {
                Object.assign(info, getExternalInfo());
                return info;
            })(),
            winston.format.json(),
        ),
        filename: 'common-%DATE%.log',
    };
    return {
        transports: [
            // 控制台输出
            new winston.transports.Console({
                format: winston.format.combine(
                    timestamp,
                    winston.format.colorize(),
                    winston.format.printf(({ level, message, timestamp, context }) => {
                        return [
                            chalk.cyan(`BEST`),
                            chalk.gray(`${timestamp}`),
                            `${level}`,
                            context ? chalk.yellow(`[${context}]`) : '',
                            chalk.white(message),
                        ]
                            .filter(Boolean)
                            .join(' ');
                    }),
                ),
            }),
            // 文件滚动日志
            new (winston as any).transports.DailyRotateFile({
                ...commonDailyRotateFileConfig,
                filename: 'application-%DATE%.log',
            }),

            // 错误日志（单独文件）
            new (winston as any).transports.DailyRotateFile({
                ...commonDailyRotateFileConfig,
                filename: 'error-%DATE%.log',
                level: 'error',
            }),
        ],
    };
}

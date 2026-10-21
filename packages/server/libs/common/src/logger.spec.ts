import { describe, it, expect, rs } from '@rstest/core';

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import winston from 'winston';

rs.mock('chalk', () => {
    const paint = (value: string) => value;
    return {
        __esModule: true,
        default: {
            red: paint,
            yellow: paint,
            green: paint,
            blue: paint,
            cyan: paint,
            magenta: paint,
            gray: paint,
            white: paint,
        },
    };
});

import { createLoggerOptions } from './logger';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function readLogFile(dir: string, prefix: string) {
    for (let i = 0; i < 10; i++) {
        const files = await fs.readdir(dir);
        const target = files.find((file) => file.startsWith(prefix) && file.endsWith('.log'));
        if (target) return fs.readFile(path.join(dir, target), 'utf8');
        await wait(100);
    }
    throw new Error(`missing ${prefix} log file`);
}

describe('createLoggerOptions', () => {
    it('uses explicit level and writes plain console log files', async () => {
        const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'bestlyg-logger-'));
        const options = createLoggerOptions({ logPath: tmpDir, level: 'debug' });
        const logger = winston.createLogger(options);
        const ansiEscape = String.fromCharCode(27);
        const message = `${ansiEscape}[34m[METHOD]: ${ansiEscape}[39mget`;

        logger.info(message);
        await wait(300);
        logger.close();

        expect(options.level).toBe('debug');

        const jsonData = await readLogFile(tmpDir, 'application-');
        expect(JSON.parse(jsonData.split('\n')[0]).message).toBe(message);

        const textData = await readLogFile(tmpDir, 'console-');
        expect(textData).toContain('BEST');
        expect(textData).toContain('info');
        expect(textData).toContain('[METHOD]: get');
        expect(textData).not.toContain(ansiEscape);
        expect(() => JSON.parse(textData.split('\n')[0])).toThrow();
    });
});

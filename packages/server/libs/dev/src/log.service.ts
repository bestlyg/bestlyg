import { Injectable, Logger } from '@nestjs/common';
import fs from 'fs-extra';
import { open } from 'node:fs/promises';
import path from 'node:path';
import { resolve } from '@bestlyg-server/common';

export interface GetLogOptions {
    name: string;
    grep?: string | string[];
    tailLine?: number | string;
}

@Injectable()
export class LogService {
    private readonly logger = new Logger(LogService.name);
    private readonly logPath = resolve('logs');
    private readonly maxReadBytes = 2 * 1024 * 1024;
    private readonly maxTailLines = 5000;

    async overview() {
        await fs.ensureDir(this.logPath);
        const fileNames = (await fs.readdir(this.logPath)).filter((name) => !name.startsWith('.'));
        return Promise.all(
            fileNames.map(async (fileName) => {
                const filePath = path.resolve(this.logPath, fileName);
                const stat = await fs.stat(filePath);
                return {
                    fileName,
                    size: stat.size,
                    modifiedTime: stat.mtime,
                    createdTime: stat.birthtime,
                };
            }),
        );
    }

    async getLog(options: GetLogOptions) {
        const filePath = this.resolveLogFile(options.name);
        if (!(await fs.pathExists(filePath))) return [];

        const stat = await fs.stat(filePath);
        const readBytes = Math.min(stat.size, this.maxReadBytes);
        const offset = Math.max(0, stat.size - readBytes);
        const handle = await open(filePath, 'r');

        try {
            const buffer = Buffer.alloc(readBytes);
            await handle.read(buffer, 0, readBytes, offset);
            const grepList = this.normalizeGrep(options.grep);
            const tailLine = this.normalizeTailLine(options.tailLine);
            const lines = buffer
                .toString('utf8')
                .split(/\r?\n/)
                .filter((line) => grepList.every((grep) => line.toLowerCase().includes(grep)));
            return lines.slice(-tailLine);
        } finally {
            await handle.close().catch((error) => {
                this.logger.warn(`close log file failed: ${error?.message ?? error}`);
            });
        }
    }

    private resolveLogFile(name: string) {
        const filePath = path.resolve(this.logPath, name || '');
        if (!filePath.startsWith(this.logPath + path.sep)) {
            throw new Error('Invalid log file path');
        }
        return filePath;
    }

    private normalizeGrep(grep: string | string[] | undefined) {
        const list = Array.isArray(grep) ? grep : grep ? [grep] : [];
        return list.map((item) => item.trim().toLowerCase()).filter(Boolean);
    }

    private normalizeTailLine(raw: number | string | undefined) {
        const tailLine = Number(raw ?? 200);
        if (!Number.isFinite(tailLine) || tailLine <= 0) return 200;
        return Math.min(Math.floor(tailLine), this.maxTailLines);
    }
}

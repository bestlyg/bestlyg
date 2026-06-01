import { ConfigurationSchema } from '@bestlyg/server-shared';
import { Logger } from '@nestjs/common';
import { loadConfig as loadConfigC12 } from 'c12';
import dotenv from 'dotenv';
import { z } from 'zod';
import type { BestlygConfig } from './utils';
import { resolve } from '../resolve';

const logger = new Logger('BestlygConfig');

dotenv.config({ path: resolve('.env') });

export async function loadBestlygConfig(): Promise<BestlygConfig> {
    // c12 根据 BESTLYG_CONFIG_NAME / NODE_ENV 在 config 目录选择配置文件；
    // 环境变量已在上方显式加载，这里关闭 c12 自己的 dotenv。

    const { config } = await loadConfigC12<BestlygConfig>({
        name: process.env.BESTLYG_CONFIG_NAME ?? 'bestlyg',
        cwd: process.env.BESTLYG_CONFIG_DIR ?? resolve('config'),
        dotenv: false,
        envName: process.env.NODE_ENV,
    });

    const { error, data } = await ConfigurationSchema.safeParseAsync(config);

    if (error) {
        const str = z.prettifyError(error);
        logger.error(`配置文件出现错误:${str}`);
        console.log(error);
        throw new Error('Config catch error');
    }

    return data;
}

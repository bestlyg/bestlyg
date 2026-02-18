import { ConfigurationSchema } from '@bestlyg/common/server';
import type { BestlygConfig } from './utils';
import type { loadConfig as loadConfigC12 } from 'c12';
import { resolve } from '../resolve';

export async function loadBestlygConfig(): Promise<BestlygConfig> {
    const loadConfig: typeof loadConfigC12 = await eval('import("c12")').then(
        (res) => res.loadConfig,
    );
    const { config } = await loadConfig<BestlygConfig>({
        name: 'bestlyg', // 会查找 bestlyg.config.ts / bestlyg.config.dev.ts 等
        cwd: resolve(),
        dotenv: true, // 自动加载 .env / .env.development
        envName: process.env.NODE_ENV,
    });

    if (!config) {
        throw new Error('Bestlyg config not found!');
    }

    console.log('===> config', config);

    return ConfigurationSchema.parseAsync(config);
}

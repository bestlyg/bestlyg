import { defineProjectConfig } from '../../src';
import { BESTLYG_ENVIRONMENTS, resolveBestlygTargetEnv } from './environments';
import { loadBestlygEnv } from './env';

const env = loadBestlygEnv();
const { targetEnv, environmentConfig } = resolveBestlygTargetEnv(env.BESTLYG_E2E_TARGET_ENV);

export default defineProjectConfig({
    description: 'Bestlyg Web E2E 测试',
    targetEnv,
    environments: BESTLYG_ENVIRONMENTS,
    runner: environmentConfig.runner,
    runtime: {
        targetEnv,
        environments: BESTLYG_ENVIRONMENTS,
        baseURL: environmentConfig.url,
        apiURL: environmentConfig.apiURL,
    },
    playwright: {
        use: {
            baseURL: environmentConfig.url,
            storageState: env.BESTLYG_E2E_STORAGE_STATE,
        },
        webServer: env.BESTLYG_E2E_WEB_SERVER_COMMAND
            ? {
                  command: env.BESTLYG_E2E_WEB_SERVER_COMMAND,
                  url: env.BESTLYG_E2E_WEB_SERVER_URL ?? environmentConfig.url,
                  reuseExistingServer: !env.CI,
                  timeout: 120_000,
              }
            : undefined,
    },
    scripts: {
        smoke: {
            description: 'Bestlyg 冒烟测试',
            testMatch: ['smoke/**/*.spec.ts'],
            workers: 1,
        },
    },
});

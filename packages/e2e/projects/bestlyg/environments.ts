import { z, type ZodType } from 'zod';
import {
    applyTargetEnvOverrides,
    loadTargetEnvOverridesFromEnv,
} from '../../src/target-env-overrides';
import type { BestlygE2ETargetEnvironmentConfig } from '../../src/types';

export interface BestlygTargetEnvironmentConfig extends BestlygE2ETargetEnvironmentConfig {
    apiURL?: string;
}

const bestlygTargetEnvironmentSchema = z.looseObject({
    url: z.url(),
    apiURL: z.url().optional(),
    runner: z
        .looseObject({
            concurrency: z.number().int().positive().optional(),
        })
        .optional(),
}) as ZodType<BestlygTargetEnvironmentConfig>;

export const BESTLYG_ENVIRONMENTS: Record<string, BestlygTargetEnvironmentConfig> = {
    local: {
        url: 'http://localhost:10001',
        apiURL: 'http://localhost:10000',
        runner: {
            concurrency: 1,
        },
    },
    production: {
        url: 'https://www.bestlyg.com',
        runner: {
            concurrency: 1,
        },
    },
};

export function resolveBestlygTargetEnv(name?: string) {
    const targetEnv = name?.trim() || 'local';
    const baseConfig = BESTLYG_ENVIRONMENTS[targetEnv];

    if (!baseConfig) {
        throw new Error(
            `未知的 Bestlyg E2E 目标环境 "${targetEnv}"。可用环境：${Object.keys(BESTLYG_ENVIRONMENTS).join(', ')}。`,
        );
    }

    const environmentConfig = applyTargetEnvOverrides(
        baseConfig,
        loadTargetEnvOverridesFromEnv(),
        bestlygTargetEnvironmentSchema,
        `Bestlyg ${targetEnv} 环境配置`,
    );

    return { targetEnv, environmentConfig };
}

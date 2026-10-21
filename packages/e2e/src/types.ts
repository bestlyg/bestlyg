import type { RstestConfig } from '@rstest/core';
import type { PlaywrightOptions } from '@rstest/playwright';

export interface E2EWebServerConfig {
    command: string;
    url: string;
    reuseExistingServer?: boolean;
    timeout?: number;
}

export type BestlygE2ETargetEnvironmentConfigValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | BestlygE2ETargetEnvironmentConfigObject;

export interface BestlygE2ETargetEnvironmentConfigObject {
    [key: string]: BestlygE2ETargetEnvironmentConfigValue;
}

export interface BestlygE2EScriptConfig {
    description?: string;
    command?: string;
    cwd?: string;
    testMatch?: string | string[];
    grep?: RegExp;
    project?: string | string[];
    headed?: boolean;
    workers?: number;
    afterScripts?: string[];
}

export interface BestlygE2ERunnerConfig extends BestlygE2ETargetEnvironmentConfigObject {
    concurrency?: number;
}

export interface BestlygE2ETargetEnvironmentConfig extends BestlygE2ETargetEnvironmentConfigObject {
    url: string;
    runner?: BestlygE2ERunnerConfig;
}

export interface BestlygE2EProjectConfig {
    description?: string;
    targetEnv?: string;
    environments?: Record<string, BestlygE2ETargetEnvironmentConfig>;
    runner?: BestlygE2ERunnerConfig;
    rstest?: RstestConfig;
    playwright?: PlaywrightOptions;
    webServer?: E2EWebServerConfig;
    runtime?: Record<string, unknown>;
    scripts: Record<string, BestlygE2EScriptConfig>;
}

export interface BestlygE2EConfig {
    rstest?: RstestConfig;
    playwright?: PlaywrightOptions;
    webServer?: E2EWebServerConfig;
    projects: Record<string, BestlygE2EProjectConfig>;
}

export interface LoadConfigOptions {
    cwd?: string;
}

export function defineE2EConfig(config: BestlygE2EConfig) {
    return config;
}

export function defineProjectConfig(config: BestlygE2EProjectConfig) {
    return config;
}

import path from 'node:path';
import type { RstestConfig } from '@rstest/core';
import { definePlaywrightConfig } from '@rstest/playwright/config';
import {
    getProjectConfig,
    getProjectSpecDir,
    getScriptConfig,
    loadConfig,
    normalizeScriptProjects,
} from './config';
import { PACKAGE_ROOT } from './paths';
import { HtmlReporter } from './html-reporter';

export async function buildRstestConfig(): Promise<RstestConfig> {
    const projectName = process.env.BESTLYG_E2E_PROJECT ?? 'bestlyg';
    const scriptName = process.env.BESTLYG_E2E_SCRIPT ?? 'smoke';
    const config = await loadConfig();
    const project = getProjectConfig(config, projectName);
    const script = getScriptConfig(project, projectName, scriptName);
    const browsers = normalizeScriptProjects(script);
    if (browsers?.some((name) => name !== 'chromium')) {
        throw new Error('@rstest/playwright currently supports the chromium E2E project only.');
    }
    const playwright = {
        ...config.playwright,
        ...project.playwright,
        contextOptions: {
            ...config.playwright?.contextOptions,
            ...project.playwright?.contextOptions,
        },
        launchOptions: {
            headless: true,
            ...config.playwright?.launchOptions,
            ...project.playwright?.launchOptions,
            ...(process.env.BESTLYG_E2E_CHROMIUM_EXECUTABLE_PATH
                ? { executablePath: process.env.BESTLYG_E2E_CHROMIUM_EXECUTABLE_PATH }
                : {}),
            ...(script.headed || process.env.BESTLYG_E2E_HEADED === '1' ? { headless: false } : {}),
            ...(process.env.BESTLYG_E2E_HEADLESS === '1' ? { headless: true } : {}),
        },
        trace: project.playwright?.trace ??
            config.playwright?.trace ?? {
                mode: 'retain-on-failure' as const,
                outputDir: path.join(PACKAGE_ROOT, 'test-results', projectName, scriptName),
            },
    };
    return {
        ...config.rstest,
        ...project.rstest,
        root: PACKAGE_ROOT,
        name: 'e2e',
        testEnvironment: 'node',
        extends: definePlaywrightConfig(playwright),
        include: (Array.isArray(script.testMatch)
            ? script.testMatch
            : [script.testMatch ?? '**/*.spec.ts']
        ).map((pattern) => path.join(getProjectSpecDir(projectName), pattern)),
        testNamePattern: script.grep,
        testTimeout: project.rstest?.testTimeout ?? config.rstest?.testTimeout ?? 60_000,
        expect: { poll: { timeout: 10_000 }, ...config.rstest?.expect, ...project.rstest?.expect },
        pool: { type: 'forks', maxWorkers: script.workers ?? 1 },
        globalSetup: [path.join(PACKAGE_ROOT, 'src/web-server.ts')],
        reporters: ['default', new HtmlReporter()],
    };
}

import path from 'node:path';
import type { PlaywrightTestConfig, Project } from '@playwright/test';
import { getProjectConfig, getProjectSpecDir, getScriptConfig, loadConfig, normalizeScriptProjects } from './config';
import { PACKAGE_ROOT } from './paths';

function createDefaultBrowserProjects(): Project[] {
    const chromiumExecutablePath = process.env.BESTLYG_E2E_CHROMIUM_EXECUTABLE_PATH?.trim();

    return [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                ...(chromiumExecutablePath
                    ? {
                          launchOptions: {
                              executablePath: chromiumExecutablePath,
                          },
                      }
                    : {}),
            },
        },
    ];
}

const DEFAULT_BROWSER_PROJECTS: Project[] = createDefaultBrowserProjects();

const DEFAULT_PLAYWRIGHT_CONFIG: Partial<PlaywrightTestConfig> = {
    fullyParallel: false,
    retries: 0,
    timeout: 60_000,
    reporter: [['list']],
    expect: {
        timeout: 10_000,
    },
    use: {
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'off',
    },
    projects: DEFAULT_BROWSER_PROJECTS,
    outputDir: path.resolve(PACKAGE_ROOT, 'test-results'),
};

function mergePlainObjects<T extends object>(...values: Array<Partial<T> | undefined>) {
    return values.reduce<T>((accumulator, value) => {
        if (!value) {
            return accumulator;
        }

        return { ...accumulator, ...value };
    }, {} as T);
}

function mergePlaywrightConfig(...configs: Array<Partial<PlaywrightTestConfig> | undefined>) {
    return configs.reduce<Partial<PlaywrightTestConfig>>((accumulator, config) => {
        if (!config) {
            return accumulator;
        }

        const merged = { ...accumulator, ...config };
        merged.use = mergePlainObjects(accumulator.use ?? {}, config.use ?? {});
        merged.expect = mergePlainObjects(accumulator.expect ?? {}, config.expect ?? {});

        if (config.projects) {
            merged.projects = config.projects;
        }

        return merged;
    }, {});
}

function selectBrowserProjects(projects: Project[] | undefined, names: string[] | undefined) {
    const candidates = projects && projects.length > 0 ? projects : DEFAULT_BROWSER_PROJECTS;

    if (!names || names.length === 0) {
        return candidates;
    }

    const wantedNames = new Set(names);
    const selected = candidates.filter((project) => project.name && wantedNames.has(project.name));

    if (selected.length === 0) {
        throw new Error(`没有匹配到 Playwright 浏览器项目：${names.join(', ')}。`);
    }

    return selected;
}

function isTruthyEnv(value: string | undefined) {
    if (!value) {
        return false;
    }

    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function getSelectedRun() {
    const projectName = process.env.BESTLYG_E2E_PROJECT;
    const scriptName = process.env.BESTLYG_E2E_SCRIPT;

    if (!projectName || !scriptName) {
        throw new Error(
            '缺少 BESTLYG_E2E_PROJECT 或 BESTLYG_E2E_SCRIPT。请通过 "bestlyg-e2e run --project <project> --script <script>" 运行测试。',
        );
    }

    return { projectName, scriptName };
}

export async function buildPlaywrightConfig(): Promise<PlaywrightTestConfig> {
    const { projectName, scriptName } = getSelectedRun();
    const config = await loadConfig();
    const projectConfig = getProjectConfig(config, projectName);
    const scriptConfig = getScriptConfig(projectConfig, projectName, scriptName);

    const mergedConfig = mergePlaywrightConfig(DEFAULT_PLAYWRIGHT_CONFIG, config.playwright, projectConfig.playwright);
    const selectedBrowserProjects = selectBrowserProjects(
        mergedConfig.projects as Project[] | undefined,
        normalizeScriptProjects(scriptConfig),
    );
    const mergedUse = mergePlainObjects(
        DEFAULT_PLAYWRIGHT_CONFIG.use ?? {},
        config.playwright?.use ?? {},
        projectConfig.playwright?.use ?? {},
        scriptConfig.headed ? { headless: false } : undefined,
        isTruthyEnv(process.env.BESTLYG_E2E_HEADED) ? { headless: false } : undefined,
        isTruthyEnv(process.env.BESTLYG_E2E_HEADLESS) ? { headless: true } : undefined,
    );

    return {
        ...mergedConfig,
        testDir: getProjectSpecDir(projectName),
        testMatch: scriptConfig.testMatch ?? '**/*.spec.ts',
        grep: scriptConfig.grep,
        workers: scriptConfig.workers ?? mergedConfig.workers,
        outputDir: path.resolve(PACKAGE_ROOT, 'test-results', projectName, scriptName),
        use: mergedUse,
        projects: selectedBrowserProjects,
    };
}

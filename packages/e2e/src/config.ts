import fs from 'node:fs/promises';
import path from 'node:path';
import { loadConfig as loadConfigInternal } from 'c12';
import { createDefu } from 'defu';
import { PACKAGE_ROOT, PROJECTS_ROOT } from './paths';
import type { BestlygE2EConfig, BestlygE2EProjectConfig, BestlygE2EScriptConfig, LoadConfigOptions } from './types';

const mergeConfigValues = createDefu((target, key, value) => {
    if (Array.isArray(target[key]) && Array.isArray(value)) {
        target[key] = value;
        return true;
    }

    return false;
});

const ROOT_DEFAULT_CONFIG: BestlygE2EConfig = {
    playwright: {},
    projects: {},
};

const PROJECT_DEFAULT_CONFIG: BestlygE2EProjectConfig = {
    playwright: {},
    scripts: {},
};

const PROJECT_CONFIG_FILES = [
    'project.config.ts',
    'project.config.mts',
    'project.config.js',
    'project.config.mjs',
    'project.config.cjs',
];

function mergeObjects<T extends object>(defaults: T, overrides?: Partial<T>) {
    return mergeConfigValues(overrides ?? {}, defaults) as T;
}

async function getProjectDirectories(projectsRoot: string) {
    try {
        const entries = await fs.readdir(projectsRoot, { withFileTypes: true });
        return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch {
        return [];
    }
}

async function hasProjectConfig(projectDir: string) {
    for (const fileName of PROJECT_CONFIG_FILES) {
        try {
            await fs.access(path.resolve(projectDir, fileName));
            return true;
        } catch {
            continue;
        }
    }

    return false;
}

async function loadProjectConfig(projectDir: string) {
    if (!(await hasProjectConfig(projectDir))) {
        return PROJECT_DEFAULT_CONFIG;
    }

    const { config } = await loadConfigInternal<BestlygE2EProjectConfig>({
        cwd: projectDir,
        name: 'project',
        dotenv: true,
        defaultConfig: PROJECT_DEFAULT_CONFIG,
    });

    return mergeObjects(PROJECT_DEFAULT_CONFIG, config);
}

export async function loadConfig(options: LoadConfigOptions = {}) {
    const cwd = options.cwd ?? PACKAGE_ROOT;
    const projectsRoot = path.resolve(cwd, 'projects');

    const { config } = await loadConfigInternal<BestlygE2EConfig>({
        cwd,
        name: 'e2e',
        dotenv: true,
        defaultConfig: ROOT_DEFAULT_CONFIG,
    });

    const rootConfig = mergeObjects(ROOT_DEFAULT_CONFIG, config);
    const configuredProjects = new Set([
        ...Object.keys(rootConfig.projects),
        ...(await getProjectDirectories(projectsRoot)),
    ]);

    const projects = await Promise.all(
        [...configuredProjects].map(async (projectName) => {
            const rootProjectConfig = rootConfig.projects[projectName] ?? PROJECT_DEFAULT_CONFIG;
            const projectDir = path.resolve(projectsRoot, projectName);
            const fileProjectConfig = await loadProjectConfig(projectDir);
            return [projectName, mergeObjects(rootProjectConfig, fileProjectConfig)] as const;
        }),
    );

    return {
        playwright: rootConfig.playwright,
        projects: Object.fromEntries(projects),
    } satisfies BestlygE2EConfig;
}

export function listProjects(config: BestlygE2EConfig) {
    return Object.keys(config.projects).sort();
}

export function listScripts(config: BestlygE2EConfig, projectName: string) {
    const project = getProjectConfig(config, projectName);
    return Object.entries(project.scripts)
        .map(([name, scriptConfig]) => ({ name, config: scriptConfig }))
        .sort((left, right) => left.name.localeCompare(right.name));
}

export function getProjectConfig(config: BestlygE2EConfig, projectName: string) {
    const projectConfig = config.projects[projectName];

    if (!projectConfig) {
        const availableProjects = listProjects(config);
        throw new Error(`未知的 E2E 项目 "${projectName}"。可用项目：${availableProjects.join(', ') || '无'}。`);
    }

    return projectConfig;
}

export function getScriptConfig(projectConfig: BestlygE2EProjectConfig, projectName: string, scriptName: string) {
    const scriptConfig = projectConfig.scripts[scriptName];

    if (!scriptConfig) {
        const availableScripts = Object.keys(projectConfig.scripts).sort();
        throw new Error(
            `项目 "${projectName}" 中不存在 E2E 脚本 "${scriptName}"。可用脚本：${availableScripts.join(', ') || '无'}。`,
        );
    }

    return scriptConfig;
}

export function normalizeScriptProjects(scriptConfig: BestlygE2EScriptConfig) {
    if (!scriptConfig.project) {
        return undefined;
    }

    return Array.isArray(scriptConfig.project) ? scriptConfig.project : [scriptConfig.project];
}

export function getProjectSpecDir(projectName: string) {
    return path.resolve(PROJECTS_ROOT, projectName, 'specs');
}

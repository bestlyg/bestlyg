import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import {
    getProjectConfig,
    getProjectSpecDir,
    getScriptConfig,
    listProjects,
    listScripts,
    loadConfig,
} from './config';
import { PACKAGE_ROOT, PLAYWRIGHT_CONFIG_PATH } from './paths';
import {
    BESTLYG_E2E_TARGET_ENV_OVERRIDES,
    parseTargetEnvOverrideArgs,
    serializeTargetEnvOverrides,
} from './target-env-overrides';
import type { BestlygE2EScriptConfig } from './types';

const require = createRequire(import.meta.url);
const DEFAULT_RUN_CONCURRENCY = 1;

export interface RunPlaywrightOptions {
    projectName?: string;
    scriptName?: string;
    specFile?: string;
    testName?: string;
    targetEnv?: string;
    envOverrides?: string[];
    concurrency?: number;
    headless?: boolean;
    playwrightArgs?: string[];
}

interface E2ERunTask {
    projectName: string;
    scriptName: string;
    specFile?: string;
}

type LoadedE2EConfig = Awaited<ReturnType<typeof loadConfig>>;

async function withRunEnv<T>(
    overrides: {
        targetEnv?: string;
        targetEnvOverrides?: string;
    },
    action: () => Promise<T>,
) {
    const { targetEnv, targetEnvOverrides } = overrides;

    if (!targetEnv && !targetEnvOverrides) {
        return action();
    }

    const previousTargetEnv = process.env.BESTLYG_E2E_TARGET_ENV;
    const previousTargetEnvOverrides = process.env[BESTLYG_E2E_TARGET_ENV_OVERRIDES];

    if (targetEnv) {
        process.env.BESTLYG_E2E_TARGET_ENV = targetEnv;
    }

    if (targetEnvOverrides) {
        process.env[BESTLYG_E2E_TARGET_ENV_OVERRIDES] = targetEnvOverrides;
    }

    try {
        return await action();
    } finally {
        if (previousTargetEnv === undefined) {
            delete process.env.BESTLYG_E2E_TARGET_ENV;
        } else {
            process.env.BESTLYG_E2E_TARGET_ENV = previousTargetEnv;
        }

        if (previousTargetEnvOverrides === undefined) {
            delete process.env[BESTLYG_E2E_TARGET_ENV_OVERRIDES];
        } else {
            process.env[BESTLYG_E2E_TARGET_ENV_OVERRIDES] = previousTargetEnvOverrides;
        }
    }
}

function createRunEnv(
    projectName: string,
    scriptName: string,
    targetEnv: string | undefined,
    targetEnvOverrides: string | undefined,
    headless: boolean | undefined,
) {
    const env: NodeJS.ProcessEnv = {
        ...process.env,
        BESTLYG_E2E_PROJECT: projectName,
        BESTLYG_E2E_SCRIPT: scriptName,
    };

    if (targetEnv) {
        env.BESTLYG_E2E_TARGET_ENV = targetEnv;
    }

    if (targetEnvOverrides) {
        env[BESTLYG_E2E_TARGET_ENV_OVERRIDES] = targetEnvOverrides;
    }

    if (headless === false) {
        env.BESTLYG_E2E_HEADED = '1';
        delete env.BESTLYG_E2E_HEADLESS;
    }

    if (headless === true) {
        env.BESTLYG_E2E_HEADLESS = '1';
        delete env.BESTLYG_E2E_HEADED;
    }

    return env;
}

function resolveScriptCwd(scriptConfig: BestlygE2EScriptConfig) {
    return scriptConfig.cwd ? path.resolve(PACKAGE_ROOT, scriptConfig.cwd) : PACKAGE_ROOT;
}

function toPosixPath(filePath: string) {
    return filePath.split(path.sep).join('/');
}

function isExistingFile(filePath: string) {
    try {
        return fs.statSync(filePath).isFile();
    } catch {
        return false;
    }
}

function isPathInside(parentPath: string, childPath: string) {
    const relativePath = path.relative(parentPath, childPath);
    return (
        relativePath.length === 0 ||
        (!relativePath.startsWith('..') && !path.isAbsolute(relativePath))
    );
}

function getSpecFileCandidates(projectName: string, specFile: string) {
    if (path.isAbsolute(specFile)) {
        return [path.normalize(specFile)];
    }

    return [
        ...new Set([
            path.resolve(PACKAGE_ROOT, specFile),
            path.resolve(getProjectSpecDir(projectName), specFile),
        ]),
    ];
}

function resolveSpecFile(projectName: string, specFile: string, strict: boolean) {
    const candidates = getSpecFileCandidates(projectName, specFile);
    const absolutePath = candidates.find(isExistingFile);

    if (!absolutePath) {
        if (strict) {
            throw new Error(`E2E spec 文件不存在：${specFile}。已尝试：${candidates.join(', ')}。`);
        }

        return undefined;
    }

    const specDir = getProjectSpecDir(projectName);

    if (!isPathInside(specDir, absolutePath)) {
        if (strict) {
            throw new Error(
                `--spec 必须指向项目 "${projectName}" 的 specs 目录下文件：${specDir}。`,
            );
        }

        return undefined;
    }

    return {
        absolutePath,
        relativePath: toPosixPath(path.relative(specDir, absolutePath)),
    };
}

function escapeRegExp(value: string) {
    return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');
}

function hasPlaywrightGrepArg(args: string[]) {
    return args.some(
        (arg) =>
            arg === '--grep' || arg === '-g' || arg.startsWith('--grep=') || arg.startsWith('-g='),
    );
}

function createTestGrepArgs(testName: string | undefined, playwrightArgs: string[]) {
    if (!testName) {
        return [];
    }

    const normalizedTestName = testName.trim();

    if (!normalizedTestName) {
        throw new Error('--test 不能为空。');
    }

    if (hasPlaywrightGrepArg(playwrightArgs)) {
        throw new Error('--test 不能和透传给 Playwright 的 --grep/-g 同时使用。');
    }

    return ['--grep', escapeRegExp(normalizedTestName)];
}

function globToRegExp(pattern: string) {
    const normalizedPattern = toPosixPath(pattern);
    let source = '';

    for (let index = 0; index < normalizedPattern.length; index += 1) {
        const char = normalizedPattern[index];
        const nextChar = normalizedPattern[index + 1];
        const charAfterNext = normalizedPattern[index + 2];

        if (char === '*' && nextChar === '*' && charAfterNext === '/') {
            source += '(?:.*/)?';
            index += 2;
            continue;
        }

        if (char === '*' && nextChar === '*') {
            source += '.*';
            index += 1;
            continue;
        }

        if (char === '*') {
            source += '[^/]*';
            continue;
        }

        source += escapeRegExp(char);
    }

    return new RegExp(`^${source}$`);
}

function scriptMatchesSpec(
    scriptConfig: BestlygE2EScriptConfig,
    relativeSpecFile: string,
    explicitScript: boolean,
) {
    const testMatch = scriptConfig.testMatch;

    if (!testMatch) {
        return explicitScript;
    }

    const patterns = Array.isArray(testMatch) ? testMatch : [testMatch];
    return patterns.some((pattern) => globToRegExp(pattern).test(relativeSpecFile));
}

function getDefaultScriptNames(config: LoadedE2EConfig, projectName: string) {
    const scripts = listScripts(config, projectName);
    const afterScriptNames = new Set(
        scripts.flatMap(({ config: scriptConfig }) => scriptConfig.afterScripts ?? []),
    );

    return scripts.map((script) => script.name).filter((name) => !afterScriptNames.has(name));
}

async function runCommandScript(
    projectName: string,
    scriptName: string,
    scriptConfig: BestlygE2EScriptConfig,
    commandArgs: string[] = [],
    targetEnv?: string,
    targetEnvOverrides?: string,
    headless?: boolean,
    specFile?: string,
    testName?: string,
) {
    const command = scriptConfig.command?.trim();

    if (!command) {
        throw new Error(`命令脚本 "${projectName}/${scriptName}" 缺少 command 配置。`);
    }

    if (specFile || testName) {
        throw new Error(
            `命令脚本 "${projectName}/${scriptName}" 不支持 --spec 或 --test，请通过 -- 向外部命令传递自定义参数。`,
        );
    }

    await new Promise<void>((resolve, reject) => {
        const child = spawn(command, commandArgs, {
            cwd: resolveScriptCwd(scriptConfig),
            env: createRunEnv(projectName, scriptName, targetEnv, targetEnvOverrides, headless),
            shell: true,
            stdio: 'inherit',
        });

        child.on('error', reject);
        child.on('exit', (code, signal) => {
            if (code === 0) {
                resolve();
                return;
            }

            if (signal) {
                reject(new Error(`命令脚本被信号 ${signal} 终止。`));
                return;
            }

            reject(new Error(`命令脚本退出码为 ${code ?? '未知'}。`));
        });
    });
}

async function runPlaywrightScript(
    config: LoadedE2EConfig,
    projectName: string,
    scriptName: string,
    playwrightArgs: string[] = [],
    targetEnv?: string,
    targetEnvOverrides?: string,
    headless?: boolean,
    specFile?: string,
    testName?: string,
) {
    const projectConfig = getProjectConfig(config, projectName);
    const scriptConfig = getScriptConfig(projectConfig, projectName, scriptName);

    if (scriptConfig.command) {
        await runCommandScript(
            projectName,
            scriptName,
            scriptConfig,
            playwrightArgs,
            targetEnv,
            targetEnvOverrides,
            headless,
            specFile,
            testName,
        );
        return;
    }

    const cliEntrypoint = require.resolve('@playwright/test/cli');
    const testGrepArgs = createTestGrepArgs(testName, playwrightArgs);

    await new Promise<void>((resolve, reject) => {
        const specArgs = specFile ? [specFile] : [];
        const args = [
            cliEntrypoint,
            'test',
            ...specArgs,
            '--config',
            PLAYWRIGHT_CONFIG_PATH,
            ...testGrepArgs,
            ...playwrightArgs,
        ];
        const child = spawn(process.execPath, args, {
            cwd: PACKAGE_ROOT,
            env: createRunEnv(projectName, scriptName, targetEnv, targetEnvOverrides, headless),
            stdio: 'inherit',
        });

        child.on('error', reject);
        child.on('exit', (code, signal) => {
            if (code === 0) {
                resolve();
                return;
            }

            if (signal) {
                reject(new Error(`Playwright 被信号 ${signal} 终止。`));
                return;
            }

            reject(new Error(`Playwright 退出码为 ${code ?? '未知'}。`));
        });
    });
}

async function runPlaywrightTask(
    config: LoadedE2EConfig,
    task: E2ERunTask,
    playwrightArgs: string[] = [],
    targetEnv?: string,
    targetEnvOverrides?: string,
    headless?: boolean,
    testName?: string,
) {
    const projectConfig = getProjectConfig(config, task.projectName);
    const scriptConfig = getScriptConfig(projectConfig, task.projectName, task.scriptName);
    let taskError: unknown;

    try {
        await runPlaywrightScript(
            config,
            task.projectName,
            task.scriptName,
            playwrightArgs,
            targetEnv,
            targetEnvOverrides,
            headless,
            task.specFile,
            testName,
        );
    } catch (error) {
        taskError = error;
    }

    if (!task.specFile && !testName) {
        for (const afterScriptName of scriptConfig.afterScripts ?? []) {
            try {
                await runPlaywrightScript(
                    config,
                    task.projectName,
                    afterScriptName,
                    playwrightArgs,
                    targetEnv,
                    targetEnvOverrides,
                    headless,
                );
            } catch (error) {
                if (!taskError) {
                    taskError = error;
                } else {
                    console.error(
                        `后置 E2E 脚本 "${task.projectName}/${afterScriptName}" 执行失败：${String(error)}`,
                    );
                }
            }
        }
    }

    if (taskError) {
        throw taskError;
    }
}

function createBatches<T>(items: T[], size: number) {
    const batches: T[][] = [];

    for (let index = 0; index < items.length; index += size) {
        batches.push(items.slice(index, index + size));
    }

    return batches;
}

function assertRunConcurrency(value: number, source: string) {
    if (!Number.isInteger(value) || value < 1) {
        throw new Error(`${source} 必须是正整数。`);
    }
}

function resolveConfiguredConcurrency(
    config: LoadedE2EConfig,
    tasks: E2ERunTask[],
    explicitConcurrency?: number,
) {
    if (explicitConcurrency !== undefined) {
        assertRunConcurrency(explicitConcurrency, '--concurrency');
        return explicitConcurrency;
    }

    const projectNames = [...new Set(tasks.map((task) => task.projectName))];

    if (projectNames.length !== 1) {
        return DEFAULT_RUN_CONCURRENCY;
    }

    const configuredConcurrency = getProjectConfig(config, projectNames[0]).runner?.concurrency;

    if (configuredConcurrency === undefined) {
        return DEFAULT_RUN_CONCURRENCY;
    }

    assertRunConcurrency(configuredConcurrency, `项目 "${projectNames[0]}" 的 runner.concurrency`);

    return configuredConcurrency;
}

function getRunTasks(
    config: LoadedE2EConfig,
    projectName: string | undefined,
    scriptName: string | undefined,
    specFile: string | undefined,
) {
    const projectNames = projectName ? [projectName] : listProjects(config);

    if (projectNames.length === 0) {
        throw new Error('当前没有配置任何 E2E 项目。');
    }

    const tasks = projectNames.flatMap<E2ERunTask>((currentProjectName) => {
        const projectConfig = getProjectConfig(config, currentProjectName);
        const scriptNames = scriptName
            ? [scriptName]
            : specFile
              ? listScripts(config, currentProjectName).map((script) => script.name)
              : getDefaultScriptNames(config, currentProjectName);

        if (scriptNames.length === 0) {
            throw new Error(`项目 "${currentProjectName}" 没有配置任何 E2E 脚本。`);
        }

        return scriptNames.flatMap((currentScriptName) => {
            const scriptConfig = getScriptConfig(
                projectConfig,
                currentProjectName,
                currentScriptName,
            );

            if (!specFile) {
                return [{ projectName: currentProjectName, scriptName: currentScriptName }];
            }

            const resolvedSpecFile = resolveSpecFile(
                currentProjectName,
                specFile,
                Boolean(projectName),
            );

            if (
                !resolvedSpecFile ||
                !scriptMatchesSpec(scriptConfig, resolvedSpecFile.relativePath, Boolean(scriptName))
            ) {
                return [];
            }

            return [
                {
                    projectName: currentProjectName,
                    scriptName: currentScriptName,
                    specFile: resolvedSpecFile.absolutePath,
                },
            ];
        });
    });

    if (specFile && tasks.length === 0) {
        throw new Error(
            `没有找到匹配 --spec "${specFile}" 的 E2E 脚本，请确认 --project、--script 和 spec 路径。`,
        );
    }

    return tasks;
}

export async function runPlaywright(options: RunPlaywrightOptions) {
    const {
        projectName,
        scriptName,
        specFile,
        testName,
        targetEnv,
        envOverrides = [],
        playwrightArgs = [],
        concurrency,
        headless,
    } = options;
    const targetEnvOverrides = serializeTargetEnvOverrides(
        parseTargetEnvOverrideArgs(envOverrides),
    );
    const config = await withRunEnv({ targetEnv, targetEnvOverrides }, () => loadConfig());
    const tasks = getRunTasks(config, projectName, scriptName, specFile);
    const runConcurrency = resolveConfiguredConcurrency(config, tasks, concurrency);

    const failures: Array<{ task: E2ERunTask; error: unknown }> = [];

    for (const batch of createBatches(tasks, runConcurrency)) {
        const results = await Promise.allSettled(
            batch.map(async (task) => {
                await runPlaywrightTask(
                    config,
                    task,
                    playwrightArgs,
                    targetEnv,
                    targetEnvOverrides,
                    headless,
                    testName,
                );
            }),
        );

        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                failures.push({ task: batch[index], error: result.reason });
            }
        });
    }

    if (failures.length > 0) {
        const summary = failures
            .map(({ task, error }) => {
                const message = error instanceof Error ? error.message : String(error);
                return `${task.projectName}/${task.scriptName}: ${message}`;
            })
            .join('\n');

        throw new Error(`以下 E2E 脚本执行失败：\n${summary}`);
    }
}

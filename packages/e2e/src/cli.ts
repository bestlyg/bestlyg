import { Command, Help } from 'commander';
import { loadConfig, listProjects, listScripts } from './config';
import { runPlaywright } from './runner';

interface RunCommandOptions {
    project?: string;
    script?: string;
    spec?: string;
    test?: string;
    targetEnv?: string;
    env?: string[];
    concurrency?: string;
    head?: boolean;
    headless?: boolean;
}

function parseConcurrency(value?: string) {
    if (!value) {
        return undefined;
    }

    const concurrency = Number.parseInt(value, 10);

    if (!Number.isFinite(concurrency) || concurrency < 1 || String(concurrency) !== value) {
        throw new Error(`--concurrency 必须是正整数，当前收到 "${value}"。`);
    }

    return concurrency;
}

function parseHeadlessOption(options: RunCommandOptions) {
    if (options.head && options.headless) {
        throw new Error('--head 和 --headless 只能选择其中一个。');
    }

    if (options.head) {
        return false;
    }

    if (options.headless) {
        return true;
    }

    return undefined;
}

function collectOptionValues(value: string, previous: string[] = []) {
    return [...previous, value];
}

function formatChineseHelp(command: Command, helper: Help) {
    return Help.prototype.formatHelp
        .call(helper, command, helper)
        .replace(/^Usage:/gm, '用法:')
        .replace(/^Arguments:/gm, '参数:')
        .replace(/^Options:/gm, '选项:')
        .replace(/^Global Options:/gm, '全局选项:')
        .replace(/^Commands:/gm, '命令:')
        .replaceAll('[options]', '[选项]')
        .replaceAll('[command]', '[命令]');
}

function formatProjectScripts(projectName: string, scripts: ReturnType<typeof listScripts>) {
    if (scripts.length === 0) {
        return [`- ${projectName}: 未配置脚本`];
    }

    return scripts.map(({ name, config }) => {
        const suffix = config.description ? `: ${config.description}` : '';
        return `- ${projectName}/${name}${suffix}`;
    });
}

async function main() {
    const program = new Command()
        .name('bestlyg-e2e')
        .description('面向 Bestlyg 项目的 Playwright E2E 运行器。')
        .helpOption('-h, --help', '显示帮助信息。')
        .helpCommand('help [命令]', '显示指定命令的帮助信息。')
        .configureHelp({ formatHelp: formatChineseHelp })
        .enablePositionalOptions();

    program
        .command('list')
        .description('列出已配置的 E2E 项目和脚本。')
        .helpOption('-h, --help', '显示帮助信息。')
        .action(async () => {
            const config = await loadConfig();
            const lines = listProjects(config).flatMap((projectName) =>
                formatProjectScripts(projectName, listScripts(config, projectName)),
            );

            if (lines.length === 0) {
                console.log('当前没有配置任何 E2E 项目。');
                return;
            }

            console.log(lines.join('\n'));
        });

    program
        .command('run')
        .description('运行已配置的 Playwright 脚本。')
        .helpOption('-h, --help', '显示帮助信息。')
        .option('--project <项目>', '项目名称；不传时运行所有已配置项目。')
        .option('--script <脚本>', '脚本名称；不传时运行目标项目下的所有默认脚本。')
        .option(
            '--spec <spec文件>',
            '只运行指定 spec 文件；可传相对项目 specs 目录或 e2e 包根目录的路径。',
        )
        .option(
            '--test <测试名称>',
            '只运行名称包含该文本的单个测试；内部按 Playwright grep 过滤。',
        )
        .option('--target-env <环境>', '目标环境名称，例如 local 或 production。')
        .option(
            '--env <键值>',
            '覆盖目标环境配置，格式 key=value；支持 a.b.c=XXX，可重复传入。',
            collectOptionValues,
        )
        .option('--concurrency <数量>', '同时运行的脚本数量；不传时读取项目配置，未配置则为 1。')
        .option('--head', '打开可见浏览器运行。')
        .option('--headless', '强制使用无头浏览器运行。')
        .allowUnknownOption(true)
        .allowExcessArguments(true)
        .passThroughOptions()
        .action(async (options: RunCommandOptions, command: Command) => {
            await runPlaywright({
                projectName: options.project,
                scriptName: options.script,
                specFile: options.spec,
                testName: options.test,
                targetEnv: options.targetEnv,
                envOverrides: options.env,
                concurrency: parseConcurrency(options.concurrency),
                headless: parseHeadlessOption(options),
                playwrightArgs: command.args,
            });
        });

    if (process.argv.length <= 2) {
        program.help();
    }

    await program.parseAsync();
}

main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
});

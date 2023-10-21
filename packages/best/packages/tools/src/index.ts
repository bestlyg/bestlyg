import {
    resolve,
    packageInfo,
    print,
    CWD,
    DIR_NAME_SOURCE,
    DIR_NAME_ESM,
    DIR_NAME_CJS,
    DIR_NAME_UMD,
    error,
    transformConfig,
    FILE_NAME_ENTRY_SCRIPT,
    FILE_NAME_PACKAGE_JSON,
    FILE_NAME_ENTRY_STYLE,
    requireJson,
    DIR_NAME_STYLE,
} from './utils';
import { Command, Option } from 'commander';
import fs from 'fs-extra';
import { buildCJS, buildESM, buildUMD, buildStyle as _buildStyle } from './commands';
import { BabelConfig } from './configs/babel';
import { TsConfig } from './configs/typescript';
import { LessConfig } from './configs/less';
import { WebpackConfig } from './configs/webpack';
import { CleanCSSConfig } from './configs/clean-css';

const contact = (v, cur) => cur.concat([v]);

const program = new Command();
program.name(packageInfo.name).description(packageInfo.description).version(packageInfo.version);

program
    .command('clean')
    .description('Clean directory.')
    .option('-d --directory <dir>', 'Work directory.', CWD)
    .action(o => {
        const { directory } = o;
        const dirs = [DIR_NAME_UMD, DIR_NAME_ESM, DIR_NAME_CJS];
        return Promise.allSettled(
            dirs.map(dir => {
                const p = resolve(directory, dir);
                return fs.pathExists(p).then(f => {
                    if (f) {
                        return fs.remove(p);
                    }
                });
            })
        ).then(
            () => print.success(`Clean sucessfully.`),
            err => error(`Clean erorr.`, err)
        );
    });

program
    .command('build')
    .description('Build a libray.')
    .option('--with-style', 'Build with style.')
    .option('--entry-dir <entry-dir>', 'Entry directory.', CWD)
    .option('--entry-file <entry-file>', 'Entry file.', FILE_NAME_ENTRY_SCRIPT)
    .option('--output-dir <output>', 'Output directory.')
    .option('--script-glob-pattern <glob>', 'Glob pattern.', contact, [])
    .option('--babel-config <path>', 'A list of babel-config.', contact, [])
    .option('--ts-config <path>', 'A list of ts-config.', contact, [])
    .option('--less-config <path>', 'A list of less-config.', contact, [])
    .option('--clean-css-config <path>', 'A list of clean-css-config.', contact, [])
    .option('--webpack-config <path>', 'A list of webpack-config.', contact, [])
    .addOption(
        new Option('--type <type>', 'Build type.')
            .choices(['ALL', 'ESM', 'CJS', 'UMD'])
            .default('ALL')
    )
    .action(o => {
        const {
            entryDir,
            entryFile,
            type,
            babelConfig,
            scriptGlobPattern,
            outputDir,
            tsConfig,
            webpackConfig,
            lessConfig,
            withStyle,
            cleanCssConfig,
        } = o;

        const buildStyle = (config: Partial<Parameters<typeof _buildStyle>[0]>) => {
            return _buildStyle({
                entry: resolve(entryDir, DIR_NAME_SOURCE, DIR_NAME_STYLE),
                configs: transformConfig<LessConfig>(lessConfig),
                ...config,
            } as any);
        };
        const build = {
            ESM: () => {
                const output = outputDir ?? resolve(CWD, DIR_NAME_ESM);
                return buildESM({
                    configs: transformConfig<TsConfig>(tsConfig),
                    entry: resolve(entryDir, DIR_NAME_SOURCE, entryFile),
                    output,
                }).then(
                    () =>
                        withStyle &&
                        buildStyle({
                            output: resolve(output, DIR_NAME_STYLE),
                        })
                );
            },
            CJS: () => {
                const output = outputDir ?? resolve(CWD, DIR_NAME_CJS);
                return buildCJS({
                    configs: transformConfig<BabelConfig>(babelConfig),
                    entry: resolve(entryDir, DIR_NAME_SOURCE),
                    globPattern: scriptGlobPattern,
                    output: outputDir ?? resolve(CWD, DIR_NAME_CJS),
                }).then(
                    () =>
                        withStyle &&
                        buildStyle({
                            output: resolve(output, DIR_NAME_STYLE),
                        })
                );
            },
            UMD: () => {
                return buildUMD({
                    configs: transformConfig<WebpackConfig>(webpackConfig),
                    cleanCssConfigs: transformConfig<CleanCSSConfig>(cleanCssConfig),
                    lessConfigs: transformConfig<LessConfig>(lessConfig),
                    withStyle
                });
            },
        };
        if (type === 'ALL') {
            const list = Object.keys(build);
            const run = (idx: number) => {
                if (idx === list.length) {
                    return Promise.resolve();
                } else {
                    return build[list[idx]]().then(() => run(idx + 1));
                }
            };
            return run(0);
        }
        if (!build[type]) error(`Unkown type ${o.type}`);
        return build[type]();
    });

program
    .command('update-package-json')
    .description('Update package json from the filed of best-tools.')
    .option('--path <path>', 'The path of package json.', resolve(CWD, FILE_NAME_PACKAGE_JSON))
    .action(o => {
        return new Promise(resolve => {
            fs.writeFile(o.path, JSON.stringify(requireJson(o.path), null, 4), err => {
                if (err) error('Update package json error.', err);
                resolve();
            });
        });
    });

program.parse();

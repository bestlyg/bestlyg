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
    FILE_NAME_ENTRY,
    FILE_NAME_PACKAGE_JSON,
} from './utils';
import { Command, Option } from 'commander';
import fs from 'fs-extra';
import { buildCJS, buildESM, buildUMD, updatePackageJson } from './build';
import { BabelConfig } from './configs/babel';
import { TsConfig } from './configs/typescript';
import { WebpackConfig } from './configs/webpack';

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
    .option('--entry-dir <entry-dir>', 'Entry directory.', resolve(CWD, DIR_NAME_SOURCE))
    .option('--entry-file <entry-file>', 'Entry file.', FILE_NAME_ENTRY)
    .option('--output <output>', 'Output directory.')
    .option('--glob-pattern <glob>', 'Glob pattern.', contact, [])
    .option('--babel-config <path>', 'A list of babel-config.', contact, [])
    .option('--ts-config <path>', 'A list of ts-config.', contact, [])
    .option('--webpack-config <path>', 'A list of webpack-config.', contact, [])
    .addOption(
        new Option('--type <type>', 'Build type.')
            .choices(['all', 'esm', 'cjs', 'umd'])
            .default('all')
    )
    .action(o => {
        const {
            entryDir,
            entryFile,
            type,
            babelConfig,
            globPattern,
            output,
            tsConfig,
            webpackConfig,
        } = o;
        // print.info(`Entry: ${o.entryDir}`);
        // print.info(`Type: ${o.type}`);
        const build = {
            esm: () =>
                buildESM({
                    configs: transformConfig<TsConfig>(tsConfig),
                    entry: resolve(entryDir, entryFile),
                    output: output ?? resolve(CWD, DIR_NAME_ESM),
                }),
            cjs: () =>
                buildCJS({
                    configs: transformConfig<BabelConfig>(babelConfig),
                    entry: entryDir,
                    globPattern,
                    output: output ?? resolve(CWD, DIR_NAME_CJS),
                }),
            umd: () =>
                buildUMD({
                    configs: transformConfig<WebpackConfig>(webpackConfig),
                }),
        };
        if (type === 'all') {
            const list = Object.values(build);
            const run = (idx: number) => {
                if (idx === list.length) {
                    return Promise.resolve();
                } else {
                    return list[idx]().then(() => run(idx + 1));
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
    .action(o => updatePackageJson(o.path));

program.parse();

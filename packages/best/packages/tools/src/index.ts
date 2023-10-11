import {
    resolve,
    packageInfo,
    print,
    CWD,
    DIR_NAME_SOURCE,
    DIR_NAME_ESM,
    DIR_NAME_CJS,
    error,
    transformConfig,
} from './utils';
import { Command, Option } from 'commander';
import fs from 'fs-extra';
import { buildCJS, buildESM } from './build';
import { BabelConfig } from './babel';
import { TsConfig } from './typescript';

const program = new Command();
program.name(packageInfo.name).description(packageInfo.description).version(packageInfo.version);

program
    .command('clean')
    .description('Clean directory.')
    .option('-d --directory <dir>', 'Work directory.', CWD)
    .action(o => {
        console.log(o);
        const dirs = [DIR_NAME_SOURCE, DIR_NAME_ESM, DIR_NAME_CJS];
        for (const dir of dirs) {
            const p = resolve(o.d, dir);
            if (fs.existsSync(p)) {
                fs.remove(p);
            }
        }
    });

program
    .command('build')
    .description('Build a libray.')
    .option('--entry <entry>', 'Entry directory.', resolve(CWD, DIR_NAME_SOURCE))
    .option('--output <output>', 'Output directory.')
    .option('--glob-pattern <glob>', 'Glob pattern.', (v, cur) => cur.concat([v]), [])
    .option('--babel-config <path>', 'A list of babel-config.', (v, cur) => cur.concat([v]), [])
    .option('--ts-config <path>', 'A list of ts-config.', (v, cur) => cur.concat([v]), [])
    .addOption(
        new Option('--type <type>', 'Build type.').choices(['esm', 'cjs', 'umd']).default('esm')
    )
    .action(o => {
        const { entry, type, babelConfig, globPattern, output, tsConfig } = o;
        print.info(`Entry: ${o.entry}`);
        print.info(`Type: ${o.type}`);
        switch (type) {
            case 'esm':
                console.log('esm');
                buildESM({
                    configs: transformConfig<TsConfig>(tsConfig),
                    entry: resolve(entry, 'index.ts'),
                    globPattern,
                    output: output ?? resolve(CWD, DIR_NAME_ESM),
                });
                break;
            case 'cjs':
                buildCJS({
                    configs: transformConfig<BabelConfig>(babelConfig),
                    entry,
                    globPattern,
                    output: output ?? resolve(CWD, DIR_NAME_CJS),
                });
                break;
            case 'umd':
                console.log('umd');
                break;
            default:
                error(`Unkown type ${o.type}`);
        }
    });

program.parse();

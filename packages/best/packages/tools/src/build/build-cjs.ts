import { BabelConfig, transformAsync as babelTransform } from '../babel';
import fs from 'fs-extra';
import { print, resolve } from '../utils';
import { glob } from 'glob';
import path from 'node:path';

export async function buildCJS({
    babelConfig,
    entry,
    globPattern,
    output,
}: {
    entry: string;
    babelConfig: BabelConfig[];
    globPattern: string[];
    output: string;
}) {
    print.info('Build CJS');
    const files = await glob([
        resolve(entry, './**/*.ts'),
        resolve(entry, './**/*.tsx'),
        `!${resolve(entry, '**/__demo__{,/**}')}`,
        `!${resolve(entry, '**/__test__{,/**}')}`,
        `!${resolve(entry, '**/*.md')}`,
        `!${resolve(entry, '**/*.mdx')}`,
        ...globPattern.map(p => resolve(entry, p)),
    ]);
    return Promise.allSettled(
        files.map(file => {
            let outputPath = resolve(output, path.relative(entry, file));
            outputPath = outputPath.replace(path.extname(outputPath), '.js');
            print.info(`Build ${path.basename(file)}`);
            return fs
                .readFile(file)
                .then(
                    data =>
                        babelTransform({
                            content: data.toString(),
                            babelConfig,
                            transformConfig: config => {
                                config.filename = file;
                                config.presets = config.presets.map(preset => {
                                    const presetEnv = '@babel/preset-env';
                                    const presetEnvOptions = { modules: 'cjs' };
                                    if (preset === presetEnv) {
                                        return [presetEnv, presetEnvOptions];
                                    }
                                    return preset;
                                });
                                return config;
                            },
                        }),
                    err => {
                        print.error(`Fs readFile error from ${file}.`);
                        print.error(err);
                        process.exit(1);
                    }
                )
                .then(
                    code =>
                        fs.ensureDir(path.dirname(outputPath)).then(
                            () => fs.writeFile(outputPath, code),
                            err => {
                                print.error(`Fs ensureDir error from ${file}.`);
                                print.error(err);
                                process.exit(1);
                            }
                        ),
                    err => {
                        print.error(`Babel transform error from ${file}.`);
                        print.error(err);
                        process.exit(1);
                    }
                )
                .then(
                    () => {},
                    err => {
                        print.error(`Fs writeFile error from ${file}.`);
                        print.error(err);
                        process.exit(1);
                    }
                );
        })
    ).then(() => {
        print.success('Build CJS sucessfully.');
    });
}

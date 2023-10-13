import { BabelConfig, transformAsync as babelTransform } from '../babel';
import fs from 'fs-extra';
import { Config, error, print, resolve } from '../utils';
import { merge } from 'lodash';
import { glob } from 'glob';
import path from 'node:path';

export async function buildCJS({
    configs,
    entry,
    globPattern,
    output,
}: {
    entry: string;
    configs: Config<BabelConfig>[];
    globPattern: string[];
    output: string;
}) {
    print.info('===> Build CJS');
    const files = await glob([
        resolve(entry, './**/*.ts'),
        resolve(entry, './**/*.tsx'),
        `!${resolve(entry, '**/__demo__/**')}`,
        `!${resolve(entry, '**/__test__/**')}`,
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
                            transformConfig: config => {
                                config.filename = file;
                                config.presets = config.presets.map(preset => {
                                    const presetEnv = '@babel/preset-env';
                                    const presetEnvOptions = { modules: 'cjs' };
                                    if (preset === presetEnv) {
                                        return [presetEnv, presetEnvOptions];
                                    } else if (Array.isArray(preset)) {
                                        preset[1] = { ...preset[1], ...presetEnvOptions };
                                    }
                                    return preset;
                                });
                                for (const cfg of configs) {
                                    if (typeof cfg === 'function') {
                                        config = cfg(config);
                                    } else {
                                        config = merge(config, cfg)
                                    }
                                }
                                return config;
                            },
                        }),
                    err => {
                        error(`Fs readFile error from ${file}.`, err);
                    }
                )
                .then(
                    code =>
                        fs.ensureDir(path.dirname(outputPath)).then(
                            () => fs.writeFile(outputPath, code),
                            err => {
                                error(`Fs ensureDir error from ${file}.`, err);
                            }
                        ),
                    err => {
                        error(`Babel transform error from ${file}.`, err);
                    }
                )
                .then(
                    () => {},
                    err => {
                        error(`Fs writeFile error from ${file}.`, err);
                    }
                );
        })
    ).then(() => {
        print.success('Build CJS sucessfully.');
    });
}

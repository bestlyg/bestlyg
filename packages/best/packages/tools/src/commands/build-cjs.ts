import { BabelConfig, transform } from '../configs/babel';
import fs from 'fs-extra';
import { Config, error, print, resolve, replaceFileExt, mergeConfig } from '../utils';
import { glob } from 'glob';
import path from 'path';

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
    print.info('Start to build CJS');
    const files = await glob([
        resolve(entry, './**/*.ts'),
        resolve(entry, './**/*.tsx'),
        ...globPattern.map(p => resolve(entry, p)),
    ]);
    return Promise.allSettled(
        files.map(file => {
            const outputPath = replaceFileExt(resolve(output, path.relative(entry, file)), '.js');
            print.info(`Build ${file}`);
            return fs
                .readFile(file)
                .then(
                    data =>
                        transform({
                            content: data.toString(),
                            transformConfig: config => {
                                config.filename = file;
                                return mergeConfig(config, configs);
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

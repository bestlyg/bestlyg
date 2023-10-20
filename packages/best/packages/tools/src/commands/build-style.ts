import fs from 'fs-extra';
import {
    Config,
    error,
    print,
    resolve,
    DIR_NAME_ESM,
    DIR_NAME_CJS,
    CWD,
    DIR_NAME_STYLE,
    mergeConfig,
} from '../utils';
import { glob } from 'glob';
import _ from 'lodash';
import path from 'path';
import { transform, LessConfig } from '../configs/less';

export async function buildStyle({
    entry,
    configs,
    output,
}: {
    entry: string;
    output: string;
    configs: Config<LessConfig>[];
}): Promise<any> {
    print.info(`Start to build style.`);
    const run = (file: string) => {
        const dir = path.dirname(file);
        const outputPath = resolve(output, path.relative(dir, file));
        return fs.ensureDir(path.dirname(outputPath)).then(() =>
            Promise.all([
                fs.copyFile(file, outputPath),
                fs.writeFile(
                    outputPath.replace(path.extname(outputPath), '.js'),
                    `require('./${path.basename(outputPath)}')`
                ),
                fs
                    .readFile(file)
                    .then(data =>
                        transform({
                            content: data.toString(),
                            transformConfig: config => {
                                config = _.cloneDeep(config);
                                config.paths.push(path.dirname(file));
                                return mergeConfig(config, configs);
                            },
                        })
                    )
                    .then(
                        res => {
                            console.log('===output', res);
                            return fs.writeFile(
                                outputPath.replace(path.extname(outputPath), '.css'),
                                res.css
                            );
                        },
                        // fs.writeFile(outputPath.replace(path.extname(outputPath), '.css'), output.css),
                        err => {
                            error('Less compile error.', err);
                        }
                    ),
            ])
        );
    };
    // return fs.readFile(entry).then(data => transform( content: data.toString(),
    //                     transformConfig: config => {
    //                         config.paths.push(path.dirname(file));
    //                         return mergeConfig(config, configs);
    //                     },));
    return run(entry).then(
        () => {
            print.success('Build style sucessfully.');
        },
        err => {
            error(`Style transform error.`, err);
        }
    );
}

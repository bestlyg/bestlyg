import { BabelConfig, transform } from '../configs/babel';
import fs from 'fs-extra';
import { Config, error, print, resolve, DIR_NAME_ESM, DIR_NAME_CJS, CWD } from '../utils';
import { mergeConfig } from '../utils';
import { glob } from 'glob';
import _ from 'lodash';
import path from 'path';
import less from 'less';
import LessAutoprefix from 'less-plugin-autoprefix';
import NpmImportPlugin from 'less-plugin-npm-import';

const npmImport = new NpmImportPlugin({ prefix: '~' });
const autoprefix = new LessAutoprefix();

export async function buildCSS({
    entry,
    globPattern,
}: {
    entry: string;
    globPattern: string[];
}): Promise<any> {
    console.log('buildCSS');
    const files = await glob([
        resolve(entry, './**/*.less'),
        ...globPattern.map(p => resolve(entry, p)),
    ]);
    const types = [DIR_NAME_ESM, DIR_NAME_CJS];
    return Promise.allSettled(
        files.map(file =>
            Promise.allSettled(
                types.map(ty => {
                    console.log(file, ty);
                    let outputPath = resolve(CWD, ty, path.relative(entry, file));
                    outputPath = outputPath.replace(path.extname(outputPath), '.css');
                    // console.log('==');
                    // console.log(`file = ${file}, ty = ${ty}, output = ${outputPath}`);
                    // print.info(`Build ${path.basename(file)}`);
                    // less.render()
                    return fs
                        .readFile(file)
                        .then(data =>
                            less.render(data.toString(), {
                                paths: ['node_modules', path.dirname(file)],
                                plugins: [npmImport, autoprefix],
                                javascriptEnabled: true,
                            })
                        )
                        .then(
                            output => {
                                console.log(
                                    `===========\nfile = ${file}, ty = ${ty}, output = ${outputPath}`
                                );
                                console.log(output);
                            },
                            err => {
                                error('Less compile error.', err);
                            }
                        );
                })
            )
        )
    );
}

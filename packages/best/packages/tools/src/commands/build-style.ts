import fs from 'fs-extra';
import {
    Config,
    error,
    print,
    resolve,
    mergeConfig,
    replaceFileExt,
    FILE_NAME_ENTRY_STYLE,
} from '../utils';
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
    const filepath = resolve(entry, FILE_NAME_ENTRY_STYLE);
    const outputFilePath = resolve(output, FILE_NAME_ENTRY_STYLE);
    return fs
        .ensureDir(output)
        .then(() =>
            Promise.allSettled([
                fs.writeFile(
                    replaceFileExt(outputFilePath, '.js'),
                    `import './${FILE_NAME_ENTRY_STYLE}';`
                ),

                fs.writeFile(
                    replaceFileExt(outputFilePath, '.d.ts'),
                    `import './${FILE_NAME_ENTRY_STYLE}';`
                ),
                fs.copySync(entry, output),
                fs
                    .readFile(filepath)
                    .then(data =>
                        transform({
                            content: data.toString(),
                            transformConfig: config => {
                                config.paths.push(entry);
                                return mergeConfig(config, configs);
                            },
                        })
                    )
                    .then(
                        res => fs.writeFile(replaceFileExt(outputFilePath, '.css'), res.css),
                        err => {
                            error('Less compile error.', err);
                        }
                    ),
            ])
        )
        .then(
            () => {
                print.success('Build style sucessfully.');
            },
            err => {
                error(`Style transform error.`, err);
            }
        );
}
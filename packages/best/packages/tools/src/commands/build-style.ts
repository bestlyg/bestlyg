import fs from 'fs-extra';
import { Config, error, print, resolve, mergeConfig, replaceFileExt } from '../utils';
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
    const build = (file: string) => {
        const dir = path.dirname(file);
        const outputPath = resolve(output, path.relative(dir, file));
        return fs.ensureDir(path.dirname(outputPath)).then(() =>
            Promise.all([
                fs.copyFile(file, outputPath),
                fs.writeFile(
                    replaceFileExt(outputPath, '.js'),
                    `import './${path.basename(outputPath)}';`
                ),
                fs.writeFile(
                    replaceFileExt(outputPath, '.d.ts'),
                    `import './${path.basename(outputPath)}';`
                ),
                fs
                    .readFile(file)
                    .then(data =>
                        transform({
                            content: data.toString(),
                            transformConfig: config => {
                                config.paths.push(path.dirname(file));
                                return mergeConfig(config, configs);
                            },
                        })
                    )
                    .then(
                        res => {
                            return fs
                                .writeFile(replaceFileExt(outputPath, '.css'), res.css)
                                .then(() => res.imports.map(p => build(p)));
                        },
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
    return build(entry).then(
        () => {
            print.success('Build style sucessfully.');
        },
        err => {
            error(`Style transform error.`, err);
        }
    );
}

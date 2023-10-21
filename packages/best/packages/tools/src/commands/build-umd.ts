import {
    Config,
    print,
    error,
    mergeConfig,
    resolve,
    CWD,
    DIR_NAME_SOURCE,
    FILE_NAME_ENTRY_STYLE,
    replaceFileExt,
    DIR_NAME_UMD,
    packageNameWithoutScope,
    DIR_NAME_STYLE,
} from '../utils';
import path from 'path';
import { WebpackConfig, transform } from '../configs/webpack';
import fs from 'fs-extra';
import { CleanCSSConfig, transform as cleanCSSTransform } from '../configs/clean-css';
import { LessConfig, transform as lessTransform } from '../configs/less';

async function buildStyle({
    lessConfigs,
    cleanCssConfigs,
}: {
    lessConfigs: Config<LessConfig>[];
    cleanCssConfigs: Config<CleanCSSConfig>[];
}) {
    print.info(`Start to build style.`);
    const entry = resolve(CWD, DIR_NAME_SOURCE, DIR_NAME_STYLE, FILE_NAME_ENTRY_STYLE);
    const outputPath = resolve(CWD, DIR_NAME_UMD, `${packageNameWithoutScope}.less`);
    return fs
        .readFile(entry)
        .then(data =>
            lessTransform({
                content: data.toString(),
                transformConfig: config => {
                    config.paths.push(path.dirname(entry));
                    return mergeConfig(config, lessConfigs);
                },
            })
        )
        .then(lessRes =>
            cleanCSSTransform({
                content: lessRes.css,
                transformConfig: config => mergeConfig(config, cleanCssConfigs),
            })
        )
        .then(cleanCSSRes =>
            fs.writeFile(replaceFileExt(outputPath, '.min.css'), cleanCSSRes.styles)
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

export async function buildUMD({
    configs,
    cleanCssConfigs,
    lessConfigs,
    withStyle,
}: {
    configs: Config<WebpackConfig>[];
    cleanCssConfigs: Config<CleanCSSConfig>[];
    lessConfigs: Config<LessConfig>[];
    withStyle: boolean;
}) {
    print.info('Start to build UMD');
    return transform({
        transformConfig: config => mergeConfig(config, configs),
    })
        .then(
            () => {
                print.success('Build UMD sucessfully.');
            },
            err => {
                error(`Webpack transform error.`, err);
            }
        )
        .then(() => {
            return (
                withStyle &&
                buildStyle({
                    lessConfigs,
                    cleanCssConfigs,
                })
            );
        });
}

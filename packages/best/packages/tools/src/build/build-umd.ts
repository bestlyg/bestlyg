import { Config, print, error, mergeConfig } from '../utils';
import { TsConfig, config as tsConfig } from '../configs/typescript';
import { WebpackConfig, config as webpackConfig, transform } from '../configs/webpack';
import { BabelConfig, config as babelConfig } from '../configs/babel';
import { merge } from 'lodash';

export async function buildUMD({
    tsConfigs,
    babelConfigs,
    webpackConfigs,
}: {
    tsConfigs: Config<TsConfig>[];
    babelConfigs: Config<BabelConfig>[];
    webpackConfigs: Config<WebpackConfig>[];
}) {
    print.info('===> Build UMD');
    return transform({
        transformConfig: config => {
            const tsRule = config.module.rules[0] as any;
            tsRule.use[0].options = mergeConfig(babelConfig, babelConfigs);
            tsRule.use[1].options = { compilerOptions: mergeConfig(tsConfig, tsConfigs) };
            return mergeConfig(webpackConfig, webpackConfigs);
        },
    }).then(
        () => {
            print.success('Build UMD sucessfully.');
        },
        err => {
            error(`Webpack transform error.`, err);
        }
    );
}

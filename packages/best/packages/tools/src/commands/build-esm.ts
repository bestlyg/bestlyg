import { Config, print, error, mergeConfig } from '../utils';
import { TsConfig, transform } from '../configs/typescript';

export async function buildESM({
    configs,
    entry,
}: {
    entry: string;
    configs: Config<TsConfig>[];
    output: string;
}) {
    print.info('===> Build ESM');
    return transform({
        entry,
        transformConfig: config => mergeConfig(config, configs),
    }).then(
        () => {
            print.success('Build ESM sucessfully.');
        },
        err => {
            error(`Ts transform error from ${entry}.`, err);
        }
    );
}

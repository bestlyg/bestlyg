import { Config, print, error } from '../utils';
import { TsConfig, transform } from '../configs/typescript';
import { merge } from 'lodash';

export async function buildESM({
    configs,
    entry,
    output,
}: {
    entry: string;
    configs: Config<TsConfig>[];
    output: string;
}) {
    print.info('===> Build ESM');
    return transform({
        entry,
        transformConfig: config => {
            for (const cfg of configs) {
                if (typeof cfg === 'function') {
                    config = cfg(config);
                } else {
                    config = merge(config, cfg);
                }
            }
            config.outDir = output;
            return config;
        },
    }).then(
        () => {
            print.success('Build ESM sucessfully.');
        },
        err => {
            error(`Ts transform error from ${entry}.`, err);
        }
    );
}

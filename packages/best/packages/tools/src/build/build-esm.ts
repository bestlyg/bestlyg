import { Config, print, resolve, error } from '../utils';
import { TsConfig, transformAsync as tsTransform } from '../typescript';
import path from 'node:path';
import { merge } from 'lodash';
import { glob } from 'glob';
import fs from 'fs-extra';

export async function buildESM({
    configs,
    entry,
    output,
}: {
    entry: string;
    configs: Config<TsConfig>[];
    globPattern: string[];
    output: string;
}) {
    print.info('===> Build ESM');
    return tsTransform({
        entry,
        transformConfig: config => {
            for (const cfg of configs) {
                if (typeof cfg === 'function') {
                    config = cfg(config);
                } else {
                    config = merge(config, cfg);
                }
            }
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

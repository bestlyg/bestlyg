import webpack from 'webpack';
import { print, error } from '../../utils';
import { WebpackConfig } from './interface';
import { config } from './config';

export interface TransformProps {
    transformConfig?: (config: WebpackConfig) => WebpackConfig;
}

export function transform({ transformConfig }: TransformProps): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        webpack(transformConfig?.(config) ?? config, (err, stats) => {
            if (err) {
                error('Webpack compiler erorr.', err.stack || err);
                return;
            }

            print.info(
                stats.toString({
                    assets: true,
                    colors: true,
                    warnings: true,
                    errors: true,
                    errorDetails: true,
                    entrypoints: true,
                    version: true,
                    hash: false,
                    timings: true,
                    chunks: false,
                    chunkModules: false,
                    children: false,
                })
            );

            if (stats.hasErrors()) {
                reject();
            } else {
                resolve();
            }
        });
    });
}

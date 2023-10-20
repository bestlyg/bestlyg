import webpack from 'webpack';
import { print, error } from '../../utils';
import { WebpackConfig } from './interface';
import { config } from './config';

export interface TransformProps {
    transformConfig?: (config: WebpackConfig) => WebpackConfig;
}

export function transform({ transformConfig = v => v }: TransformProps): Promise<void> {
    return new Promise<void>(resolve => {
        webpack(transformConfig(config), (err, stats) => {
            if (err) {
                error('Webpack compiler erorr.', err.stack || err);
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
                error('Webpack compiler erorr.', stats);
            }
            resolve();
        });
    });
}

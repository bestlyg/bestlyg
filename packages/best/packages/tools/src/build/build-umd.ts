import { Config, print, error, mergeConfig } from '../utils';
import { WebpackConfig, transform } from '../configs/webpack';

export async function buildUMD({ configs }: { configs: Config<WebpackConfig>[] }) {
    print.info('===> Build UMD');
    return transform({
        transformConfig: config => mergeConfig(config, configs),
    }).then(
        () => {
            print.success('Build UMD sucessfully.');
        },
        err => {
            error(`Webpack transform error.`, err);
        }
    );
}

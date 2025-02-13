import { getServerConfiguration, ServerConfigurationSchema } from '@bestlyg/common';
import * as utils from './utils/index';
import * as vendor from './vendor/index';

const resolve = utils.getResolveFunction(__dirname, 2);

vendor.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'common', '.env'),
});

const config = ServerConfigurationSchema.parse(getServerConfiguration());

export const globalInjectData = {
    utils,
    config,
    ...vendor,
};

// export default globalInjectData;

export * as utils from './utils/index';
export * from './vendor/index';

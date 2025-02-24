import { getConfiguration, ConfigurationSchema, getResolveFunction } from '@bestlyg/common/server';
import { getDirname } from 'metadata-file';
import * as common from '@bestlyg/common/server';
import * as vendor from './vendor';

const resolve = getResolveFunction(getDirname(), 1);

vendor.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'common', '.env'),
});

const config = ConfigurationSchema.parse(getConfiguration());

export const best = { common, config, ...vendor };

export const _best = best;

export default best;

export * from './vendor';

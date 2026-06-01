import { getConfiguration, ConfigurationSchema, getResolveFunction } from '@bestlyg/server-shared';
import { getDirname } from 'metadata-file';
import * as common from '@bestlyg/server-shared';
import * as vendor from './vendor';

const resolve = getResolveFunction(getDirname(import.meta.url), 1);

vendor.dotenv.config({
    path: resolve('node_modules', '@bestlyg', 'server-shared', '.env'),
});

const config = ConfigurationSchema.parse(getConfiguration());

export type Best = {
    common: typeof common;
    config: typeof config;
} & typeof vendor;

export const best: Best = { common, config, ...vendor };

export const _best = best;

export default best;

export * from './vendor';

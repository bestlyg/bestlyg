import { findClosestFile } from './find-closest-file';
import { LESS_PLUGINS_CONFIG_JS } from './constants';
import merge from 'lodash.merge';
import { pathToFileURL } from 'node:url';

export interface LessPluginsConfig {
    hooks: object;
}

export const defaultConfig: LessPluginsConfig = { hooks: {} };

export async function loadConfig(dirPath: string): Promise<LessPluginsConfig> {
    let currentConfig = merge({}, defaultConfig);
    try {
        const configPath = findClosestFile({ dirPath, fileName: LESS_PLUGINS_CONFIG_JS });
        if (configPath) {
            currentConfig = merge(
                currentConfig,
                (await import(pathToFileURL(configPath).href)).default,
            );
        }
    } catch (err) {
        console.error(err);
    }
    return currentConfig;
}

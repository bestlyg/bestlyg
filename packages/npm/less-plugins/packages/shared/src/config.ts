import { findClosestFile } from './find-closest-file';
import { LESS_PLUGINS_CONFIG_JS } from './constants';
import merge from 'lodash.merge';

export interface LessPluginsConfig {
    hooks: object;
}

export const defaultConfig: LessPluginsConfig = { hooks: {} };

export function loadConfig(dirPath: string): LessPluginsConfig {
    let currentConfig = merge({}, defaultConfig);
    try {
        const configPath = findClosestFile({ dirPath, fileName: LESS_PLUGINS_CONFIG_JS });
        if (configPath) {
            currentConfig = merge(currentConfig, require(configPath));
        }
    } catch (err) {
        console.error(err);
    }
    return currentConfig;
}

import { CONFIG_KEY_SEPARATOR, TYPE_SEPARATOR } from '../config';

export function buildConfigKeyPrefix(type: string, typeId: string) {
    return `${type}${TYPE_SEPARATOR}${typeId}`;
}

export function buildConfigKey(type: string, typeId: string, configName: string) {
    return `${buildConfigKeyPrefix(type, typeId)}${CONFIG_KEY_SEPARATOR}${configName}`;
}

export function extractConfigName(configKey: string) {
    const separatorIndex = configKey.indexOf(CONFIG_KEY_SEPARATOR);
    if (separatorIndex < 0) return '';
    return configKey.slice(separatorIndex + CONFIG_KEY_SEPARATOR.length);
}

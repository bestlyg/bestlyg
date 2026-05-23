import { CONFIG_KEY_SEPARATOR, TYPE_SEPARATOR } from '../config';

/** 构建配置 key 前缀，格式为 type@typeId。 */
export function buildConfigKeyPrefix(type: string, typeId: string) {
    return `${type}${TYPE_SEPARATOR}${typeId}`;
}

/** 构建完整配置 key，格式为 type@typeId:configName。 */
export function buildConfigKey(type: string, typeId: string, configName: string) {
    return `${buildConfigKeyPrefix(type, typeId)}${CONFIG_KEY_SEPARATOR}${configName}`;
}

/** 从完整配置 key 中提取 configName。 */
export function extractConfigName(configKey: string) {
    const separatorIndex = configKey.indexOf(CONFIG_KEY_SEPARATOR);
    if (separatorIndex < 0) return '';
    return configKey.slice(separatorIndex + CONFIG_KEY_SEPARATOR.length);
}

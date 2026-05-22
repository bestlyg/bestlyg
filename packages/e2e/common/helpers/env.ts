export function getOptionalEnv(name: string) {
    const value = process.env[name]?.trim();
    return value ? value : undefined;
}

export function getRequiredEnv(name: string) {
    const value = getOptionalEnv(name);

    if (!value) {
        throw new Error(`缺少必需的环境变量：${name}`);
    }

    return value;
}

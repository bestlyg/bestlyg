export function hasEnv(name: string) {
    const value = process.env[name];
    return typeof value === 'string' && value.trim().length > 0;
}

export function hasAllEnv(names: string[]) {
    return names.every((name) => hasEnv(name));
}

import type { Credentials } from '../types/credentials';
import { getOptionalEnv } from './env';

export function getCredentials(prefix: string): Credentials | undefined {
    const username = getOptionalEnv(`${prefix}_USERNAME`);
    const password = getOptionalEnv(`${prefix}_PASSWORD`);

    if (!username && !password) {
        return undefined;
    }

    if (!username || !password) {
        throw new Error(`必须同时设置 ${prefix}_USERNAME 和 ${prefix}_PASSWORD。`);
    }

    return { username, password };
}

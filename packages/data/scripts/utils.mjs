import '@bestlyg/cli/globals';
import { fileURLToPath } from 'node:url';

export function resolve(...p) {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ...p);
}

export async function getFiles() {
    return glob(path.join('**', '*.*'), { cwd: resolve('src') });
}

import path from 'node:path';
import url from 'node:url';

export const resolve = (...p: string[]) =>
    path.resolve(
        path.dirname(url.fileURLToPath(import.meta.url)),
        ...new Array(2).fill('..'),
        ...p,
    );

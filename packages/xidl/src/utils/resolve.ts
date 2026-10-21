import path from 'node:path';
import url from 'node:url';
import { existsSync } from 'node:fs';

let packageRoot = path.dirname(url.fileURLToPath(import.meta.url));
while (!existsSync(path.join(packageRoot, 'package.json'))) {
    const parent = path.dirname(packageRoot);
    if (parent === packageRoot) throw new Error('Cannot locate the xidl package directory');
    packageRoot = parent;
}

export const resolve = (...p: string[]) => path.resolve(packageRoot, ...p);

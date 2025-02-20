import manifest from '@bestlyg/server/manifest.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';
import url from 'url';

const resolve = (...p) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);

const apiPath = resolve('src', 'manifest.ts');

fs.writeFileSync(apiPath, `export const serverManifest = ${JSON.stringify(manifest, null, 4)} as const;`);

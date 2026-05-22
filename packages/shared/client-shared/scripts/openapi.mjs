import fs from 'node:fs';
import path from 'path';
import url from 'url';
import { camelCase } from 'change-case';

const resolve = (...p) =>
    path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', ...p);
const distPath = resolve('src', 'openapi.ts');
const openapi = JSON.parse(fs.readFileSync(resolve('..', '..', 'server', 'openapi.json'), 'utf8'));

const apiMap = createApiMap();

fs.writeFileSync(distPath, `export const apiMap = ${JSON.stringify(apiMap, null, 4)} as const;`);

function createApiMap() {
    const res = {};
    for (const [path, item] of Object.entries(openapi.paths)) {
        for (const [method, data] of Object.entries(item)) {
            const [controllerName, ...methodName] = data.operationId.split('_');
            if (!res[controllerName]) res[controllerName] = {};
            const controller = res[controllerName];
            controller[camelCase(methodName.join('_'))] = {
                method,
                path,
            };
        }
    }
    return res;
}

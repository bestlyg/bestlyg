import { error, FIELD_NAME_PACKAGE_JSON } from '../utils';

interface BestToolsPackageJson {
    extends?: string[];
    vars?: Record<string, any>;
    meta?: Record<string, any>;
}

function loadFile(
    map: Record<string, Record<string, any>>,
    path: string,
    pathSet = new Set<string>()
) {
    if (pathSet.has(path)) throw new Error('Cyclic Path.');
    if (map[path]) return;
    const json = require(path);
    map[path] = json;
    pathSet.add(path);
    for (const p of (json?.[FIELD_NAME_PACKAGE_JSON] as BestToolsPackageJson)?.extends ?? []) {
        loadFile(map, p);
    }
    pathSet.delete(path);
}

function loadVars(map: Record<string, Record<string, any>>, path: string) {
    const json: BestToolsPackageJson = map[path]?.[FIELD_NAME_PACKAGE_JSON] ?? {};
    const vars = json.vars ?? {};
    if (!json.extends) return json.vars ?? {};
    const res = (json.extends ?? []).reduce(
        (o, path) => ({
            ...o,
            ...loadVars(map, path),
        }),
        {} as BestToolsPackageJson['vars']
    );
    return {
        ...res,
        ...vars,
    };
}

function loadMetas(map: Record<string, Record<string, any>>, path: string) {
    const json: BestToolsPackageJson = map[path]?.[FIELD_NAME_PACKAGE_JSON] ?? {};
    const meta = json.meta ?? {};
    console.log('path', path, json);
    const res = (json.extends ?? []).reduce(
        (o, path) => ({
            ...o,
            ...loadMetas(map, path),
        }),
        {} as BestToolsPackageJson['meta']
    );
    return {
        ...res,
        ...meta,
    };
}

export function updatePackageJson(path: string) {
    const map: Record<string, Record<string, any>> = {};
    try {
        loadFile(map, path);
        // console.log(map);
        const vars: Record<string, any> = loadVars(map, path);
        const metas: Record<string, any> = loadMetas(map, path);
        console.log('vars', vars);
        console.log('metas', metas);
    } catch (err) {
        error('Update package json error.', err);
    }
}

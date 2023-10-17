import { error, FIELD_NAME_PACKAGE_JSON } from '../utils';

interface BestToolsPackageJson {
    extends?: string[];
    vars?: Record<string, any>;
    template?: Record<string, Record<string, any>>;
}

function loadFile(map: Record<string, Record<string, any>>, path: string) {
    if (map[path]) return;
    const json = require(path);
    map[path] = json;
    for (const p of (json?.[FIELD_NAME_PACKAGE_JSON] as BestToolsPackageJson)?.extends ?? []) {
        loadFile(map, p);
    }
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

export function updatePackageJson(path: string) {
    const map: Record<string, Record<string, any>> = {};
    try {
        loadFile(map, path);
        const vars: Record<string, any> = loadVars(map, path);
        console.log('vars', vars);
    } catch (err) {
        error('Update package json error.', err);
    }
}

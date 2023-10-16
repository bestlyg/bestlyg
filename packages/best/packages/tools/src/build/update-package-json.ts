import { error } from '../utils';
import fs from 'fs-extra';
import { merge } from 'lodash';

const TAG = 'best-tools';
interface BestToolsPackageJson {
    extends?: string | string[];
    vars?: any;
    template?: Record<string, Record<string, any>>;
}

function loadExtends(fn: (p: string) => void, info: BestToolsPackageJson['extends']) {
    if (typeof info === 'string') {
        return [fn(info)];
    } else if (Array.isArray(info)) {
        return info.map(p => fn(p));
    }
}

function loadFile(map: Record<string, Record<string, any>>, path: string) {
    if (!map[path]) return;
    const json = require(path);
    map[path] = json;
    const fn = loadFile.bind(null, map);
    loadExtends(fn, json?.[TAG]?.['extends'] ?? []);
}

function loadVars(map: Record<string, Record<string, any>>, path: string) {
    const res: BestToolsPackageJson = map[path][TAG] ?? {};
    const vars: Record<string, any> = {};
    // const vars = map[path][TAG]?.vars;
    const fn = loadVars.bind(null, map);
}

export function updatePackageJson(path: string) {
    const pathSet = new Set<string>([path]);
    const map: Record<string, Record<string, any>> = {};
    try {
        loadFile(map, path);
        const vars: Record<string, any> = {};
    } catch (err) {
        error('Update package json error.', err);
    }
}

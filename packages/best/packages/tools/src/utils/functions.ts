import path, { dirname } from 'path';
import fs from 'fs-extra';
import { FIELD_NAME_PACKAGE_JSON, print } from '../utils';
import { merge } from 'lodash';
import _ from 'lodash';

export const resolve = (...p: string[]) => path.resolve(__dirname, '../..', ...p);

export function error(msg: string, err?: any) {
    print.error(msg);
    console.error(err);
    process.exit(1);
}

export type Config<T> = T | ((config: T) => T);
export function transformConfig<T>(paths: string[]): Config<T>[] {
    const res: Config<T>[] = [];
    for (const p of paths) {
        if (!fs.existsSync(p) || !fs.statSync(p).isFile()) continue;
        try {
            const name = path.basename(p);
            if (name === '.json') {
                const config = fs.readFileSync(p).toString();
                res.push(JSON.parse(config));
            } else if (name === '.js') {
                const config = require(p);
                if (
                    typeof config === 'function' ||
                    (typeof config === 'object' && config !== null)
                ) {
                    res.push(config);
                }
            } else {
                error(`Unknown Config Path.`);
            }
        } catch (err) {
            error(`Transform Config Error.`, err);
        }
    }
    return res;
}
export function mergeConfig<T>(config: T, configs: Config<T>[]) {
    for (const cfg of configs) {
        if (typeof cfg === 'function') {
            config = (cfg as Function)(config);
        } else {
            config = merge(config, cfg);
        }
    }
    return config;
}

export interface BestToolsPackageJson {
    extends?: string[];
    vars?: Record<string, any>;
    meta?: Record<string, any>;
}
export function requireJson(path: string) {
    const map: Record<string, Record<string, any>> = {};
    try {
        loadFile(path);
        const vars: Record<string, any> = loadVars(path);
        const metas: Record<string, any> = loadMetas(path);
        // console.log('map', map);
        // console.log('vars', vars);
        // console.log('metas', metas);
        return _.mergeWith({}, map[path], metas, (_1, srcValue) => {
            if (typeof srcValue === 'string') {
                // console.log('OlD', srcValue, _.template(srcValue, { imports: { _, vars } })());
                return _.template(srcValue, { imports: { _, vars } })();
            }
            return srcValue;
        });
    } catch (err) {
        error('Update package json error.', err);
    }

    function loadFile(path: string, pathSet = new Set<string>()) {
        if (pathSet.has(path)) throw new Error('Cyclic Path.');
        if (map[path]) return;
        const json = require(path);
        map[path] = json;
        pathSet.add(path);
        for (const p of (json?.[FIELD_NAME_PACKAGE_JSON] as BestToolsPackageJson)?.extends ?? []) {
            loadFile(resolve(dirname(path), p), pathSet);
        }
        pathSet.delete(path);
    }

    function loadVars(path: string) {
        const json: BestToolsPackageJson = map[path]?.[FIELD_NAME_PACKAGE_JSON] ?? {};
        return _.merge(
            {},
            ...(json.extends ?? []).map(p => loadVars(resolve(dirname(path), p))),
            json.vars ?? {}
        );
    }

    function loadMetas(path: string) {
        const json: BestToolsPackageJson = map[path]?.[FIELD_NAME_PACKAGE_JSON] ?? {};
        return _.merge(
            {},
            ...(json.extends ?? []).map(p => loadMetas(resolve(dirname(path), p))),
            json.meta ?? {}
        );
    }
}

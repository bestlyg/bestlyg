import { FIELD_NAME } from './constants';
import _ from 'lodash';
import { resolve } from './functions';
import { dirname } from 'path';
import { PackageJsonExtend } from './types';
import { error } from './print';

function removeNullKeys(obj) {
    if (_.isArray(obj)) {
        return obj.filter(v => !_.isNull(v));
    } else if (_.isObject(obj)) {
        return _.omitBy(
            _.mapValues(obj, value => removeNullKeys(value)),
            _.isNull
        );
    } else {
        return obj;
    }
}

export interface RequireJsonOptions {
    fieldName?: string;
}

export function requireJson<R = any>(path: string, options: RequireJsonOptions = {}): R {
    const { fieldName = FIELD_NAME } = options;
    const map: Record<string, Record<string, any>> = {};
    try {
        loadFile(path);
        const vars: Record<string, any> = load(path, 'vars');
        const metas: Record<string, any> = load(path, 'meta');
        // console.log('map', map);
        // console.log('vars', vars);
        // console.log('metas', metas);
        const mergedObj = _.merge({}, map[path], metas);
        mergedObj[fieldName] = map[path][fieldName];
        return removeNullKeys(
            _.cloneDeepWith(mergedObj, value => {
                if (_.isString(value)) {
                    return _.template(value, { imports: { _, vars } })();
                }
            })
        );
    } catch (err) {
        error('Update package json error.', err);
    }

    function loadFile(path: string, pathSet = new Set<string>()) {
        if (pathSet.has(path)) error('Cyclic Path.');
        if (map[path]) return;
        const json = require(path);
        map[path] = json;
        pathSet.add(path);
        for (const p of (json?.[fieldName] as PackageJsonExtend)?.extends ?? []) {
            loadFile(resolve(dirname(path), p), pathSet);
        }
        pathSet.delete(path);
    }

    function load<K extends keyof PackageJsonExtend>(path: string, key: K) {
        const json: PackageJsonExtend = map[path]?.[fieldName] ?? {};
        return _.merge(
            {},
            ...(json.extends ?? []).map(p => load(resolve(dirname(path), p), key)),
            json[key] ?? {}
        );
    }
}

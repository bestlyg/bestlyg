import { FIELD_NAME } from './constants';
import _ from 'lodash';
import { resolve } from './functions';
import { dirname } from 'path';
import { PackageJsonExtend } from './types';
import { error } from './print';
import { fs } from 'zx';

function removeNullKeys(obj) {
    if (_.isArray(obj)) {
        return obj.filter(v => !_.isNull(v));
    } else if (_.isObject(obj)) {
        return _.omitBy(
            _.mapValues(obj, value => removeNullKeys(value)),
            _.isNull,
        );
    } else {
        return obj;
    }
}

export interface RequireJsonOptions {
    fieldName?: string;
}

export const cachedJson: Record<string, Record<string, any>> = {};

export function loadFile(path: string, pathSet: Set<string>, options: RequireJsonOptions) {
    const { fieldName = FIELD_NAME } = options;
    if (pathSet.has(path)) error('Cyclic Path.');
    if (cachedJson[path]) return;
    const json = fs.readJSONSync(path);
    cachedJson[path] = json;
    pathSet.add(path);
    for (const p of (json?.[fieldName] as PackageJsonExtend)?.extends ?? []) {
        loadFile(resolve(dirname(path), p), pathSet, options);
    }
    pathSet.delete(path);
}

export function load<K extends keyof PackageJsonExtend>(
    path: string,
    key: K,
    options: RequireJsonOptions,
) {
    const { fieldName = FIELD_NAME } = options;
    const json: PackageJsonExtend = cachedJson[path]?.[fieldName] ?? {};
    return _.merge(
        {},
        ...(json.extends ?? []).map(p => load(resolve(dirname(path), p), key, options)),
        json[key] ?? {},
    );
}

export function requireJson<R = any>(path: string, options: RequireJsonOptions = {}): R {
    const { fieldName = FIELD_NAME } = options;
    try {
        loadFile(path, new Set(), options);
        const vars: Record<string, any> = load(path, 'vars', options);
        const metas: Record<string, any> = load(path, 'meta', options);
        const mergedObj = _.merge({}, cachedJson[path], metas);
        mergedObj[fieldName] = cachedJson[path][fieldName];
        return removeNullKeys(
            _.cloneDeepWith(mergedObj, value => {
                if (_.isString(value)) {
                    return _.template(value, { imports: { _, vars } })();
                }
            }),
        );
    } catch (err) {
        error('Update package json error.', err);
    }
}

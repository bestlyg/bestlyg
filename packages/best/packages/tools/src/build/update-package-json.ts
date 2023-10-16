import { error } from '../utils';
import fs from 'fs-extra';
import { merge } from 'lodash';

const TAG = 'best-tools';

function dfs({
    vars,
    path,
    pathSet,
}: {
    vars: Record<string, any>;
    path: string;
    pathSet: Set<string>;
}) {
    const info = require(path);
    if (!info[TAG]) return info;
    const nextVars = {
        ...info[TAG],
        ...vars,
    };
}

export function updatePackageJson(path: string) {
    const vars: Record<string, any> = {};
    const pathSet = new Set<string>([path]);
    try {
        return dfs({
            path,
            vars,
            pathSet,
        });
    } catch (err) {
        error('Update package json error.', err);
    }
}

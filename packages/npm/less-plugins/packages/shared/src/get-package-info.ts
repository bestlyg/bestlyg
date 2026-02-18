import get from 'lodash.get';
import { findClosestFile } from './find-closest-file';
import { FILE_NAME_PACKAGE_JSON } from './constants';
import path from 'path';

export function getPackageJsonPath(currentDirectory: string) {
    try {
        const pkgPath = findClosestFile({
            dirPath: currentDirectory,
            fileName: FILE_NAME_PACKAGE_JSON,
        });
        return pkgPath;
    } catch (_err) {
        return null;
    }
}

export function getPackageJson(currentDirectory: string): Record<string, any> {
    try {
        const pkgPath = getPackageJsonPath(currentDirectory);
        if (!pkgPath) return null;
        return require(pkgPath);
    } catch (_err) {
        return null;
    }
}

export function getPackageJsonField(
    currentDirectory: string,
    key: string,
    transform: string | Function,
) {
    try {
        const pkgJson = getPackageJson(currentDirectory);
        if (!pkgJson) return null;
        let transformFn: Function = (v) => v;
        if (typeof transform === 'string') transformFn = eval(transform);
        else if (typeof transform === 'function') transformFn = transform;
        return transformFn(get(pkgJson, key))?.toString() ?? null;
    } catch (_err) {
        return null;
    }
}

export function getCurrentPackageName(currentDirectory: string) {
    const pkgPath = getPackageJsonPath(currentDirectory);
    if (!pkgPath) return null;
    const dirPath = path.dirname(pkgPath);
    return path.basename(dirPath);
}

export function getCurrentPackageScope(currentDirectory: string) {
    const pkgPath = getPackageJsonPath(currentDirectory);
    if (!pkgPath) return null;
    const dirPath = path.dirname(pkgPath);
    const parentPath = path.dirname(dirPath);
    if (parentPath.startsWith('@')) {
        return path.basename(parentPath.substring(1));
    }
    return null;
}

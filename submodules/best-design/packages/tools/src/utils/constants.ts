import fs from 'fs-extra';
import { getEnv, resolve } from './functions.js';

export const PREFIX = getEnv('BEST') ?? 'BEST';
export const CWD = getEnv('CWD') ?? process.cwd();
export const DEV = !!getEnv('DEV') ?? false;
export const FILE_NAME_PACKAGE_JSON = getEnv('FILE_NAME_PACKAGE_JSON') ?? 'package.json';

export const packageInfo: {
    name: string;
    version: string;
    description: string;
} = fs.existsSync(resolve(FILE_NAME_PACKAGE_JSON))
    ? fs.readJSONSync(resolve(FILE_NAME_PACKAGE_JSON))
    : {};

export const currentPackageInfo: {
    name: string;
    version: string;
    description: string;
    author: string;
    contributors: string[];
} = fs.existsSync(resolve(CWD, FILE_NAME_PACKAGE_JSON))
    ? fs.readJSONSync(resolve(CWD, FILE_NAME_PACKAGE_JSON))
    : {};

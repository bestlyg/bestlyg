import { fs } from 'zx';
import { getEnv, resolve, tryToNumber } from './functions';
/** 单页行数 */
export const LINES_PER_PAGE = tryToNumber(getEnv('LINES_PER_PAGE'), 62);
/** 最大页数的一半 */
export const MAX_HALF_PAGE = tryToNumber(getEnv('MAX_HALF_PAGE'), 30);
export const MAX_HALF_LINES = LINES_PER_PAGE * MAX_HALF_PAGE;
export const CHARS_PER_LINE = tryToNumber(getEnv('CHARS_PER_LINE'), 95);
export const PREFIX = getEnv('COPY-RIGHT') ?? 'COPY-RIGHT';
export const SPACE_PER_TAB = tryToNumber(getEnv('SPACE-PER-TAB'), 4);
export const CWD = getEnv('CWD') ?? process.cwd();
export const DEV = !!getEnv('DEV') ?? false;
export const IS_TTP = process.env.BUILD_REGION !== 'cn';
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

import { resolve } from './functions';

export const PREFIX = process.env.BEST_TOOLS_PREFIX ?? '[best-tools]';
export const DIR_NAME_ESM = process.env.BEST_TOOLS_DIR_NAME_ESM ?? 'es';
export const DIR_NAME_CJS = process.env.BEST_TOOLS_DIR_NAME_CJS ?? 'lib';
export const DIR_NAME_UMD = process.env.BEST_TOOLS_DIR_NAME_UMD ?? 'dist';
export const DIR_NAME_SOURCE = process.env.BEST_TOOLS_DIR_NAME_SOURCE ?? 'src';
export const DIR_NAME_STYLE = process.env.BEST_TOOLS_DIR_NAME_STYLE ?? 'style';
export const FILE_NAME_ENTRY = process.env.BEST_TOOLS_FILE_NAME_ENTRY ?? 'index.ts';
export const FILE_NAME_PACKAGE_JSON =
    process.env.BEST_TOOLS_FILE_NAME_PACKAGE_JSON ?? 'package.json';
export const FIELD_NAME_PACKAGE_JSON =
    process.env.BEST_TOOLS_FIELD_NAME_PACKAGE_JSON ?? 'best-tools';
export const CWD = process.cwd();

export const packageInfo: {
    name: string;
    version: string;
    description: string;
} = require(resolve(FILE_NAME_PACKAGE_JSON));

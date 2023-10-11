import { resolve } from './functions';

export const packageInfo: {
    name: string;
    version: string;
    description: string;
} = require(resolve('package.json'));

export const PREFIX = process.env.BEST_TOOLS_PREFIX ?? '[best-tools]';
export const DIR_NAME_ESM = process.env.BEST_TOOLS_DIR_NAME_ESM ?? 'es';
export const DIR_NAME_CJS = process.env.BEST_TOOLS_DIR_NAME_CJS ?? 'lib';
export const DIR_NAME_UMD = process.env.BEST_TOOLS_DIR_NAME_UMD ?? 'dist';
export const DIR_NAME_SOURCE = process.env.BEST_TOOLS_DIR_NAME_SOURCE ?? 'src';
export const FILE_NAME_ENTRY = process.env.BEST_TOOLS_FILE_NAME_ENTRY ?? 'index.ts';
export const CWD = process.cwd();

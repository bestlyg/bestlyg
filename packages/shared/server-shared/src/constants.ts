import fs from 'fs-extra';
import { getEnv, resolve } from './functions';

/** 当前工作目录，允许通过 BEST_CWD 覆盖。 */
export const CWD = getEnv('CWD') ?? process.cwd();
/** 是否开启开发模式能力，读取 BEST_DEV。 */
export const DEV = !!getEnv('DEV');

/** 当前包信息文件名，允许通过 BEST_FILE_NAME_PACKAGE_JSON 覆盖。 */
export const FILE_NAME_PACKAGE_JSON = getEnv('FILE_NAME_PACKAGE_JSON') ?? 'package.json';

/** server-shared 所在包的 package.json 信息。 */
export const packageInfo: {
    name: string;
    version: string;
    description: string;
} = fs.existsSync(resolve(FILE_NAME_PACKAGE_JSON))
    ? fs.readJSONSync(resolve(FILE_NAME_PACKAGE_JSON))
    : {};

/** 当前运行目录下的 package.json 信息。 */
export const currentPackageInfo: {
    name: string;
    version: string;
    description: string;
    author: string;
    contributors: string[];
} = fs.existsSync(resolve(CWD, FILE_NAME_PACKAGE_JSON))
    ? fs.readJSONSync(resolve(CWD, FILE_NAME_PACKAGE_JSON))
    : {};

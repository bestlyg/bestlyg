import path from 'node:path';
import { getDirname } from 'metadata-file';
import { PREFIX } from './base';

/** 读取带 BEST 前缀的环境变量。 */
export function getEnv(s: string) {
    return process.env[`${PREFIX}_${s}`];
}

/** 创建相对 dirname 向上回退 upTimes 层后的 path.resolve 函数。 */
export function getResolveFunction(dirname: string, upTimes = 0): (...p: string[]) => string {
    return function resolve(...p: string[]) {
        return path.resolve(dirname, ...new Array(upTimes).fill('..'), ...p);
    };
}

/** 仓库服务端常用路径解析函数，默认从 server-shared 包位置回到项目根附近。 */
export const resolve = getResolveFunction(getDirname(import.meta.url), 3);

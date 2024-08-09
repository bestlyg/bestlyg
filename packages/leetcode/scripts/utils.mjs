/**
 * @typedef {import("./types").LeetCodeDataList} LeetCodeDataList
 */

import '@bestlyg/cli/globals';
import os from 'node:os';

export const resolve = best.utils.getResolveFunction(import.meta, 1);

export const dataRootPath = resolve('data');

export const mainJsonFile = 'main.json';

/**
 * @returns {LeetCodeDataList}
 */
export async function getLeetCodeDataList() {
    const dirs = await fs.readdir(dataRootPath);
    return await Promise.all(
        dirs
            .filter(dir => dir !== mainJsonFile)
            .map(async dirName => {
                const dirPath = resolve(dataRootPath, dirName);
                let globPath = resolve(dirPath, './*.json');
                if (os.platform() === 'win32') globPath = glob.convertPathToPattern(globPath);
                const filePathList = await glob(globPath);
                const problems = await Promise.all(
                    filePathList.map(filePath => fs.readJSON(filePath))
                );
                return {
                    dirName,
                    dirPath,
                    problems,
                };
            })
    );
}

export const sortOrderList = ['面试题', 'LCP', 'LCR'];
/**
 * @param {string} dirName
 */
export function getDirNameOrder(dirName) {
    const idx = sortOrderList.findIndex(v => v.startsWith(dirName));
    return idx === -1 ? parseInt(dirName) : idx + 10 ** 7;
}

/**
 * @param {string} dirName1
 * @param {string} dirName2
 */
export function dirSort(dirName1, dirName2) {
    const order1 = getDirNameOrder(dirName1);
    const order2 = getDirNameOrder(dirName2);
    return order1 - order2;
}

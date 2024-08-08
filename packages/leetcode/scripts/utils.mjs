/**
 * @typedef {import("./types").LeetCodeDataList} LeetCodeDataList
 */

import '@bestlyg/cli/globals';

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
                const filePathList = await glob(resolve(dirPath, './*.json'));
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

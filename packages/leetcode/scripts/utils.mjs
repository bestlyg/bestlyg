/**
 * @typedef {import("../dist/types").LeetCodeDataList} LeetCodeDataList
 */

import '@bestlyg/cli/globals';
import os from 'node:os';

export const resolve = best.utils.getResolveFunction(import.meta, 1);

export const dataRootPath = resolve('data');

export const scriptPath = resolve('scripts');

export const codePath = resolve(scriptPath, 'code');

export const mainJsonFile = 'main.json';

export const mainJsonFilePath = resolve(dataRootPath, 'main.json');

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
                    filePathList.map(async filePath => {
                        const data = await fs.readJSON(filePath);
                        return {
                            problemName: path.basename(filePath),
                            problemPath: filePath,
                            problemData: data,
                        };
                    })
                );
                return {
                    dirName,
                    dirPath,
                    problems,
                };
            })
    );
}

export const sortOrderList = ['面试题', '剑指Offer', '剑指OfferII', 'LCP', 'LCR'];

/**
 * @param {string} dirName
 */
export function getDirNameOrder(dirName) {
    const idx = sortOrderList.findIndex(v => dirName.startsWith(v));
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

/**
 * @param {string} problemName
 */
export function getProblemNameOrder(problemName) {
    const prefixIdx = sortOrderList.findIndex(v => problemName.startsWith(v));
    if (prefixIdx > -1) problemName = problemName.substring(sortOrderList[prefixIdx].length);
    let num = parseFloat(problemName);
    if (prefixIdx > -1) num += 10 ** (5 + prefixIdx);
    return num;
}

/**
 * @param {string} problemName1
 * @param {string} problemName2
 */
export function problemSort(problemName1, problemName2) {
    const order1 = getProblemNameOrder(problemName1);
    const order2 = getProblemNameOrder(problemName2);
    return order1 - order2;
}

/**
 * @param {string} problemName
 */
export function getDirNameFromProblemName(problemName) {
    const prefix = sortOrderList.find(v => problemName.startsWith(v));
    if (prefix) return prefix;
    const num = ~~((parseFloat(problemName) - 1) / 100);
    return `${num * 100 + 1}-${100 * num + 100}`;
}

export const LeetCodeLevel = {
    Easy: 'Easy',
    Medium: 'Medium',
    Hard: 'Hard',
};

export const LeetCodeScript = {
    JS: 'javascript',
    TS: 'typescript',
    PY: 'python',
    CS: 'c#',
    C: 'c',
    CPP: 'cpp',
    JAVA: 'java',
    GO: 'go',
    RUST: 'rust',
};

export const DATE_FORMAT_SOLUTION = 'YYYY-MM-DD';

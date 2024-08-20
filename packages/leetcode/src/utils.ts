import best from '@bestlyg/cli';
import os from 'node:os';
import { LeetCodeDataList, LeetCodeProblemData, LeetCodeReadmeData } from './types';
import { LeetCode } from './leetcode';

const { fs, glob, path } = best.zx;

export const resolve = best.utils.getResolveFunction(__dirname, 2);
export const PATH_GRAPHQL = resolve('graphql');
export const PATH_DATA = resolve('data');
export const PATH_CODE = resolve('code');
export const FILE_NAME_MAIN = 'main.json';
export const PATH_MAIN_JSON = resolve(PATH_DATA, FILE_NAME_MAIN);
export const DATE_FORMAT_SOLUTION = 'YYYY-MM-DD';
export const BASE_URL = 'https://leetcode.com';
export const BASE_URL_CN = 'https://leetcode.cn';
export const USER_AGENT = 'Mozilla/5.0 LeetCode API';

export function parseCookie(cookie: string): Record<string, string> {
    return cookie
        .split(';')
        .map(x => x.trim().split('='))
        .reduce(
            (acc, x) => {
                acc[x[0]] = x[1];
                return acc;
            },
            {} as Record<string, string>,
        );
}

export async function getLeetCodeDataList(): Promise<LeetCodeDataList> {
    const dirs = await fs.readdir(PATH_DATA);
    const result = await Promise.all(
        dirs
            .filter(dir => dir !== FILE_NAME_MAIN)
            .map(async dirName => {
                const dirPath = resolve(PATH_DATA, dirName);
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
                        } as LeetCodeProblemData;
                    }),
                );
                return {
                    dirName,
                    dirPath,
                    problems,
                };
            }),
    );
    return result.sort((v1, v2) => dirSort(v1.dirName, v2.dirName));
}

export async function getLeetCodeReadme(): Promise<LeetCodeReadmeData> {
    return fs.readJSON(resolve(PATH_DATA, FILE_NAME_MAIN));
}

export const sortOrderList = ['面试题', '剑指Offer', '剑指OfferII', 'LCP', 'LCR'];

export function getDirNameOrder(dirName: string) {
    const idx = sortOrderList.findIndex(v => dirName.startsWith(v));
    return idx === -1 ? parseInt(dirName) : idx + 10 ** 7;
}

export function dirSort(dirName1: string, dirName2: string) {
    const order1 = getDirNameOrder(dirName1);
    const order2 = getDirNameOrder(dirName2);
    return order1 - order2;
}

export function getProblemNameOrder(problemName: string) {
    const prefixIdx = sortOrderList.findIndex(v => problemName.startsWith(v));
    if (prefixIdx > -1) problemName = problemName.substring(sortOrderList[prefixIdx].length);
    let num = parseFloat(problemName);
    if (prefixIdx > -1) num += 10 ** (5 + prefixIdx);
    return num;
}

export function problemSort(problemName1: string, problemName2: string) {
    const order1 = getProblemNameOrder(problemName1);
    const order2 = getProblemNameOrder(problemName2);
    return order1 - order2;
}

export function getDirNameFromProblemName(problemName: string) {
    const prefix = sortOrderList.find(v => problemName.startsWith(v));
    if (prefix) return prefix;
    const num = ~~((parseFloat(problemName) - 1) / 100);
    return `${num * 100 + 1}-${100 * num + 100}`;
}

export function getTitleSlugFromURL(url: string) {
    const res = Array.from(url.matchAll(/https:\/\/leetcode.cn\/problems\/(.*)/g));
    return res[0][1];
}

export async function updateProblemFromLeetcode(
    leetcode: LeetCode,
    { problemData, problemPath, problemName }: LeetCodeProblemData,
) {
    try {
        const titleSlug = getTitleSlugFromURL(problemData.url);
        const problemResult = await leetcode.getProblem(titleSlug);
        if (!problemResult) {
            throw new Error('Get problem result fail.');
        }
        problemData.id = problemResult.questionId;
        problemData.name = (
            problemResult.questionFrontendId +
            '.' +
            problemResult.translatedTitle
        ).replace(/ /g, '');
        problemData.level = problemResult.difficulty;
        problemData.tagList = problemResult.topicTags.map(v => v.translatedName);
        await fs.writeFile(problemPath, JSON.stringify(problemData, null, 4));
        console.log(`${problemName} is updated`);
    } catch (err) {
        console.log(`${problemName} update fail`);
        console.error(err);
    }
}

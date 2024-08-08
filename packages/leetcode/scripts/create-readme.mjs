/**
 * @typedef {import("./types").LeetCodeReadmeData} LeetCodeReadmeData
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList } from './utils.mjs';

const dataList = await getLeetCodeDataList();

const readmeData = await getReadmeData();

/**
 * @return {LeetCodeReadmeData}
 */
async function getReadmeData() {
    return {
        markdownCount: dataList.map(v => v.problems).flat().length,
        solutionCount: dataList
            .map(v => v.problems)
            .flat()
            .map(v => v.solutions)
            .flat().length,
        index: [],
        tag: [],
        difficulty: [],
    };
}
console.log(readmeData);

/**
 * @typedef {import("./types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("./types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList, dirSort } from './utils.mjs';

const dataList = await getLeetCodeDataList();

const readmeData = await getReadmeData();

function createIndexData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = [];
    for (const data of dataList) {
        res.push({
            dirName: data.dirName,
            problems: data.problems.map(v => v.name),
        });
    }
    return res.sort((v1, v2) => dirSort(v1.dirName, v2.dirName));
}

/**
 * @return {LeetCodeReadmeData}
 */
async function getReadmeData() {
    return {
        markdownCount: dataList.map(v => v.problems).flat().length,
        solutionCount: dataList.map(v => v.problems.map(v => v.solutions)).flat(3).length,
        index: createIndexData(),
        tag: [],
        difficulty: [],
    };
}
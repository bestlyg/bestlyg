/**
 * @typedef {import("./types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("./types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList, dirSort, mainJsonFilePath, LeetCodeLevel } from './utils.mjs';

function createIndexData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = [];
    for (const data of dataList) {
        res.push({
            label: data.dirName,
            problems: data.problems.map(v => v.problemData.name),
        });
    }
    return res.sort((v1, v2) => dirSort(v1.label, v2.label));
}

function createTagData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = [];
    /** @type {Record<string, string[]>} */
    const record = {};
    for (const problem of dataList.map(v => v.problems).flat()) {
        for (const tag of problem.problemData.tagList) {
            let list = record[tag];
            if (!list)
                res.push({
                    label: tag,
                    problems: (list = record[tag] = []),
                });
            list.push(problem.name);
        }
    }
    return res;
}

function createLevelData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = Object.fromEntries(Object.keys(LeetCodeLevel).map(k => [k, []]));
    /** @type {Record<string, string[]>} */
    for (const problem of dataList.map(v => v.problems).flat()) {
        const list = record[problem.level];
        list.push(problem.name);
    }
    return res;
}

/**
 * @return {LeetCodeReadmeData}
 */
async function getReadmeData() {
    return {
        markdownCount: dataList.map(v => v.problems).flat().length,
        solutionCount: dataList.map(v => v.problems.map(v => v.solutions)).flat(3).length,
        index: createIndexData(),
        tag: createTagData(),
        level: createLevelData(),
    };
}

const dataList = await getLeetCodeDataList();

const readmeData = await getReadmeData();

await fs.writeFile(mainJsonFilePath, JSON.stringify(readmeData, null, 4));

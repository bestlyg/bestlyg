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
            label: data.dirName,
            problems: data.problems.map(v => v.name),
        });
    }
    return res.sort((v1, v2) => dirSort(v1.dirName, v2.dirName));
}

function createTagData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = [];
    /** @type {Record<string, string[]>} */
    const record = {};
    for (const data of dataList.map(v => v.problems).flat()) {
        for (const tag of data.tag) {
            let list = record[tag];
            if (!list)
                res.push({
                    label: tag,
                    problems: (list = record[tag] = []),
                });
            list.push(data.name);
        }
    }
    return res;
}

function createLevelData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = [];
    /** @type {Record<string, string[]>} */
    const record = {};
    for (const data of dataList.map(v => v.problems).flat()) {
        let list = record[data.level];
        if (!list)
            res.push({
                label: data.level,
                problems: (list = record[data.level] = []),
            });
        list.push(data.name);
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

console.log(readmeData.level);

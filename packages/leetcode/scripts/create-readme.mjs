/**
 * @typedef {import("../dist/types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("../dist/types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import {
    getLeetCodeDataList,
    dirSort,
    LeetCodeLevel,
    problemSort,
    PATH_MAIN_JSON,
} from '@bestlyg/leetcode';

function createIndexData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = [];
    for (const data of dataList) {
        res.push({
            label: data.dirName,
            problems: data.problems.map(v => v.problemData.name),
        });
    }
    res.forEach(v => v.problems.sort((p1, p2) => problemSort(p1, p2)));
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
            list.push(problem.problemData.name);
        }
    }
    res.sort(({ label: v1 }, { label: v2 }) => v1.localeCompare(v2));
    res.forEach(v => v.problems.sort((p1, p2) => problemSort(p1, p2)));
    return res;
}

function createLevelData() {
    /** @type {LeetCodeReadmeDataItem[]} */
    const res = Object.keys(LeetCodeLevel).map(k => ({
        label: k,
        problems: [],
    }));
    /** @type {Record<string, string[]>} */
    for (const problem of dataList.map(v => v.problems).flat()) {
        const list = res.find(v => v.label === problem.problemData.level).problems;
        list.push(problem.problemData.name);
    }
    res.forEach(v => v.problems.sort((p1, p2) => problemSort(p1, p2)));
    return res;
}

/**
 * @return {LeetCodeReadmeData}
 */
async function getReadmeData() {
    return {
        problemCount: dataList.map(v => v.problems).flat().length,
        solutionCount: dataList.map(v => v.problems.map(v => v.problemData.solutions)).flat(10 ** 9)
            .length,
        index: createIndexData(),
        tag: createTagData(),
        level: createLevelData(),
    };
}

const dataList = await getLeetCodeDataList();

const readmeData = await getReadmeData();

await fs.writeFile(PATH_MAIN_JSON, JSON.stringify(readmeData, null, 4));

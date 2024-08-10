/**
 * @typedef {import("./types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("./types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList, DATE_FORMAT_SOLUTION } from './utils.mjs';

const dataList = await getLeetCodeDataList();

const levelMap = {
    简单: 'Easy',
    中等: 'Medium',
    困难: 'Hard',
};

for (const { problemData, problemPath } of dataList.map(v => v.problems).flat()) {
    const tagList = problemData.tag;
    problemData.tagList = tagList;
    problemData.level = levelMap[problemData.difficulty];
    delete problemData.tag;
    delete problemData.difficulty;
    for (const solution of problemData.solutions) {
        solution.date = best.dayjs(solution.date).format(DATE_FORMAT_SOLUTION);
    }
    console.log(problemData);
    break;
}

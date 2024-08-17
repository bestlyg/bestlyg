/**
 * @typedef {import("../dist/types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("../dist/types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import { getLeetCodeDataList } from '@bestlyg/leetcode';

const dataList = await getLeetCodeDataList();
const run = best.pLimit(10);

for (const { problemData, problemPath } of dataList.map(v => v.problems).flat()) {
    if (problemPath.includes(' ')) {
        console.log(problemPath);
        await fs.writeFile(problemPath.replace(/ /g, ''), JSON.stringify(problemData, null, 4));
        await fs.remove(problemPath);
    }
}

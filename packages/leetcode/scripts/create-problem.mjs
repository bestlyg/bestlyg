/**
 * @typedef {import("../dist/types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("../dist/types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import {
    PATH_DATA,
    getDirNameFromProblemName,
    resolve,
    DATE_FORMAT_SOLUTION,
} from '@bestlyg/leetcode';
import { problem } from './problem.mjs';

/**
 * @param {string} str
 */
function descFormat(str) {
    return str.endsWith('。') ? str : str + '。';
}

const dirName = getDirNameFromProblemName(problem.name);
const filePath = resolve(PATH_DATA, dirName, problem.name + '.json');
if (problem.exist) {
    const newSolutions = problem.solutions;
    for (const s of problem.solutions) {
        s.date = best.dayjs(s.date).format(DATE_FORMAT_SOLUTION);
        s.desc = descFormat(s.desc);
    }
    problem = await fs.readJSON(filePath);
    problem.solutions.push(...newSolutions);
} else {
    problem.name = problem.name.replace(/ /g, '');
    problem.desc = descFormat(problem.desc);
}

delete problem.exist;
await fs.ensureDir(path.dirname(filePath));
await fs.writeFile(filePath, JSON.stringify(problem, null, 4));

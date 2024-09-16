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
    updateProblemFromLeetcode,
    LeetCode,
} from '@bestlyg/leetcode';
import { problem as problemFromCreate } from './problem.mjs';

const leetcode = new LeetCode({
    credential: {
        csrf: process.env.BESTLYG_LEETCODE_CSRF,
        session: process.env.BESTLYG_LEETCODE_SESSION,
    },
});

let problem = problemFromCreate;

/**
 * @param {string} str
 */
function descFormat(str) {
    return str.endsWith('。') ? str : str + '。';
}

problem.name = problem.name.replace(/ /g, '');
const dirName = getDirNameFromProblemName(problem.name);
const filePath = resolve(PATH_DATA, dirName, problem.name + '.json');
problem.solutions.forEach(s => {
    s.date = best.dayjs(s.date).format(DATE_FORMAT_SOLUTION);
});
if (problem.exist) {
    const newSolutions = problem.solutions;
    for (const s of problem.solutions) {
        s.date = best.dayjs(s.date).format(DATE_FORMAT_SOLUTION);
        s.desc = descFormat(s.desc);
    }
    problem = await fs.readJSON(filePath);
    problem.solutions.push(...newSolutions);
} else {
    problem.desc = descFormat(problem.desc);
}

delete problem.exist;
await fs.ensureDir(path.dirname(filePath));
await fs.writeFile(filePath, JSON.stringify(problem, null, 4));

await updateProblemFromLeetcode(leetcode, {
    problemPath: filePath,
    problemName: problem.name,
    problemData: problem,
});

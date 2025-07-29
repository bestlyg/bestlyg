/**
 * @typedef {import("../dist/types").LeetCodeReadmeData} LeetCodeReadmeData
 * @typedef {import("../dist/types").LeetCodeReadmeDataItem} LeetCodeReadmeDataItem
 */

import '@bestlyg/cli/globals';
import {
    getDirNameFromProblemName,
    DATE_FORMAT_SOLUTION,
    LeetCode,
    getTitleSlugFromURL,
} from '@bestlyg/leetcode';
import axios from 'axios';
import { problem as problemFromCreate } from './problem.mjs';

axios.defaults.baseURL = 'http://127.0.0.1:10000';

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
// const filePath = resolve(PATH_DATA, dirName, problem.name + '.json');

const titleSlug = getTitleSlugFromURL(problem.url);
const problemResult = await leetcode.getProblem(titleSlug);
problem.id = problemResult.questionId;
problem.name = (problemResult.questionFrontendId + '.' + problemResult.translatedTitle).replace(
    / /g,
    '',
);
problem.level = problemResult.difficulty;
problem.tagList = problemResult.topicTags.map(v => v.translatedName);

problem.solutions.forEach(s => {
    s.date = best.dayjs(s.date).format(DATE_FORMAT_SOLUTION);
});
if (problem.exist) {
    throw new Error('XXX')
    // const problemData = await prisma.leetcodeProblem.findFirst({
    //     where: { name: problem.name },
    // });

    // problemData.tags = problem.tagList;
    // problemData.level = problem.level;
    // await prisma.leetcodeProblem.update({ data: problemData, where: { id: problemData.id } });
    // await prisma.leetcodeSolution.createMany({
    //     data: problem.solutions.map(({ script, time, memory, desc, code, date }) => ({
    //         script,
    //         time,
    //         memory,
    //         desc,
    //         code,
    //         date: new Date(date),
    //         leetcodeProblemId: problemData.id,
    //     })),
    // });
} else {
    problem.desc = descFormat(problem.desc);

    delete problem.exist;

    await createProblem([{
        name: problem.name,
        url: problem.url,
        desc: problem.desc,
        tags: problem.tagList,
        level: problem.level,
        solutions: problem.solutions.map(({ script, time, memory, desc, code, date }) => ({
            script,
            time,
            memory,
            desc,
            code,
            date: new Date(date),
        })),
    }]);
}

// await fs.ensureDir(path.dirname(filePath));
// await fs.writeFile(filePath, JSON.stringify(problem, null, 4));

async function createProblem(problem) {
    console.log('CreateProblem');
    console.log(JSON.stringify(problem, null, 4));

    const resp = await axios({
        method: 'post',
        url: '/api/database/leetcode-problem',
        data: problem,
    });

    console.log(resp.data);
}

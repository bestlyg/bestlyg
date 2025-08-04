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
import { username, password } from '../temp/utils.mjs';

const leetcode = new LeetCode({
    credential: {
        csrf: process.env.BESTLYG_LEETCODE_CSRF,
        session: process.env.BESTLYG_LEETCODE_SESSION,
    },
});

axios.defaults.baseURL = 'http://127.0.0.1:10000';
axios.defaults.headers.Authorization = 'Bearer ' + (await login()).accessToken;

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
    // const problemData = await prisma.leetcodeProblem.findFirst({
    //     where: { name: problem.name },
    // });

    const existProblem = await getProblem(problem.name);
    console.log('problem', existProblem);
    const id = existProblem.id;

    await createSolution(
        problem.solutions.map(({ script, time, memory, desc, code, date }) => ({
            script,
            time,
            memory,
            desc,
            code,
            date: new Date(date),
            problemId: id,
        })),
    );

    delete problem.solutions;

    await updateProblem(existProblem.id, problem);
} else {
    problem.desc = descFormat(problem.desc);

    delete problem.exist;

    await createProblem([
        {
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
        },
    ]);
}

async function login() {
    const resp = await axios({
        method: 'post',
        url: '/api/auth/login',
        data: { username, password },
    });

    return resp.data.data;
}

// await fs.ensureDir(path.dirname(filePath));
// await fs.writeFile(filePath, JSON.stringify(problem, null, 4));

async function createProblem(problem) {
    console.log('CreateProblem');
    console.log(JSON.stringify(problem, null, 4));

    const data = await login();

    const resp = await axios({
        method: 'post',
        url: '/api/database/leetcode-problem',
        headers: { Authorization: 'Bearer ' + data.accessToken },
        data: problem,
    });

    console.log(resp.data);
}

async function getProblem(name) {
    console.log('getProblem');

    const resp = await axios({
        method: 'get',
        url: '/api/database/leetcode-problem',
        params: { name },
    });

    return resp.data.data;
}

async function updateProblem(id, problem) {
    console.log('updateProblem');
    console.log(JSON.stringify(problem, null, 4));

    const resp = await axios({
        method: 'patch',
        url: '/api/database/leetcode-problem/' + id,
        data: problem,
    });

    return resp.data.data;
}

async function createSolution(solution) {
    console.log('createSolution');
    console.log(JSON.stringify(solution, null, 4));

    const resp = await axios({
        method: 'post',
        url: '/api/database/leetcode-solution',
        data: solution,
    });

    return resp.data.data;
}

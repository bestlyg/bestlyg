import '@bestlyg/cli/globals';
import { PATH_CODE } from '@bestlyg/leetcode';

// /** @type {import("../dist/types").LeetCodeProblem} */
/** @type {Problem} */
export const problem = {
    exist: true,
    name: '808. 分汤',
    url: 'https://leetcode.cn/problems/soup-servings',
    level: 'Easy',
    tagList: [],
    desc: `返回汤 A 在 B 前耗尽的概率，加上两种汤在 同一回合 耗尽概率的一半。返回值在正确答案 10-5 的范围内将被认为是正确的。`,
    solutions: [
        {
            script: 'python',
            // date: '2025.05.24',
            time: 4,
            memory: 9.3,
            desc: 'dfs',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};

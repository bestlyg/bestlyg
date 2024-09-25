import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '2306. 公司命名',
    url: 'https://leetcode.cn/problems/naming-a-company',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `返回 不同 且有效的公司名字的数目。`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 409,
            memory: 28.9,
            desc: '把首字符做key存储数据，遍历时取差集',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};

import '@bestlyg/cli/globals';
import { LeetCodeLevel, LeetCodeScript, PATH_CODE } from '@bestlyg/leetcode';

/** @type {import("../dist/types").LeetCodeProblem} */
export const problem = {
    exist: !true,
    name: '1884. 鸡蛋掉落-两枚鸡蛋',
    url: 'https://leetcode.cn/problems/egg-drop-with-2-eggs-and-n-floors',
    level: LeetCodeLevel.Easy,
    tagList: [],
    desc: `请你计算并返回要确定 f 确切的值 的 最小操作次数 是多少？`,
    solutions: [
        {
            script: LeetCodeScript.PY,
            // date: '2024-09-15',
            time: 2719,
            memory: 21.09,
            desc: '遍历,每次尝试从一个楼层开始掉落时，统计碎了和没碎的情况',
            code: await fs.readFile(PATH_CODE, 'utf8'),
        },
    ],
};

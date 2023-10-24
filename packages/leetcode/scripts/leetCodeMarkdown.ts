import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1155. 掷骰子等于目标和的方法数',
    url: 'https://leetcode.cn/problems/number-of-dice-rolls-with-target-sum',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定三个整数 n ,  k 和 target ，返回可能的方式(从总共 kn 种方式中)滚动骰子的数量，使正面朝上的数字之和等于 target 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     script: Script.CPP,
        //     time: 4,
        //     memory: 7.93,
        //     desc: '排序后贪心判断',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 84,
            memory: 18.8,
            desc: '记忆化递归，记录当前序号和剩余目标',
            code: `class Solution:
    def numRollsToTarget(self, n: int, k: int, target: int) -> int:
        @cache
        def dfs(idx: int, target: int) -> int:
            if idx == n: return target == 0
            return sum(dfs(idx + 1, target - i) for i in range(1, min(k, target) + 1)) % (10 ** 9 + 7)
        return dfs(0, target)`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 1.98,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

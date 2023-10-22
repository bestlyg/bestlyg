import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2678. 老人的数目',
    url: 'https://leetcode.cn/problems/number-of-senior-citizens',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回乘客中年龄 严格大于 60 岁 的人数。`,
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
            time: 36,
            memory: 15.65,
            desc: '切片后统计',
            code: `class Solution:
    def countSeniors(self, details: List[str]) -> int:
        return sum(int(v[11:13]) > 60 for v in details)`,
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

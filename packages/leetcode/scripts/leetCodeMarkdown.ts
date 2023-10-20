import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2525. 根据规则将箱子分类',
    url: 'https://leetcode.cn/problems/categorize-box-according-to-criteria',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你四个整数 length ，width ，height 和 mass ，分别表示一个箱子的三个维度和质量，请你返回一个表示箱子 类别 的字符串。`,
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
        //     memory: 9.2,
        //     desc: '双指针',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 40,
            memory: 15.66,
            desc: '逻辑判断',
            code: `class Solution:
    def categorizeBox(self, length: int, width: int, height: int, mass: int) -> str:
        v = length * width * height
        bulky = length >= 10 ** 4 or width >= 10 ** 4 or height >= 10 ** 4 or v >= 10 ** 9
        heavy = mass >= 100
        if bulky and heavy:
            return "Both"
        elif bulky:
            return "Bulky"
        elif heavy:
            return "Heavy"
        return "Neither"
`,
        },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.12,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

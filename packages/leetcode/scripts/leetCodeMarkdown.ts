import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '2586. 统计范围内的元音字符串数',
    url: 'https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。`,
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
        //     time: 716,
        //     memory: 172.36,
        //     desc: '同上',
        //     code: ``,
        // },
        {
            script: Script.PY,
            time: 36,
            memory: 15.77,
            desc: '合计',
            code: `class Solution:
    def vowelStrings(self, words: List[str], left: int, right: int) -> int:
        return sum(word[0] in 'aeiou' and word[-1] in 'aeiou' for word in words[left:right + 1])`,
        },
        {
            script: Script.TS,
            time: 72,
            memory: 43.89,
            desc: '合计',
            code: `function vowelStrings(words: string[], left: number, right: number): number {
    return words.slice(left, right + 1).filter(s => 'aeiou'.includes(s[0]) && 'aeiou'.includes(s[s.length - 1])).length
};`,
        },
        // {
        //     script: Script.RUST,
        //     time: 564,
        //     memory: 85,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

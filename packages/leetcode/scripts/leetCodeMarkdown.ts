import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '187. 重复的DNA序列',
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
            time: 80,
            memory: 28.48,
            desc: '哈希存储',
            code: `class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        res = []
        m = Counter()
        for i in range(len(s) - 9):
            subs = s[i: i + 10]
            m[subs] += 1
            if m[subs] == 2: res.append(subs)
        return res`,
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

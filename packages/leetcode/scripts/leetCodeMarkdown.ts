import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: true,
    name: '522. 最长特殊序列 II',
    url: 'https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `对数组 nums 执行上述操作任意次后，返回数组可能取得的 最大 美丽值。`,
    solutions: [
        // {
        //     date: new Date('2020.11.11').getTime(),
        //     script: Script.JS,
        //     time: 140,
        //     memory: 45.82,
        //     desc: 'dp',
        //     code: ``,
        // },
        // {
        //     date: new Date('2020.07.25').getTime(),
        //     script: Script.TS,
        //     time: 188,
        //     memory: 39.68,
        //     desc: 'dp[i][j] = 分成i份时，只有前j个元素时的最小值',
        //     code: ``,
        // },

        // {
        //     date: new Date('2022.03.28').getTime(),
        //     script: Script.CPP,
        //     time: 0,
        //     memory: 6.32,
        //     desc: '模拟',
        //     code: ``,
        // },
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 38,
            memory: 16.28,
            desc: '枚举',
            code: `class Solution:
    def findLUSlength(self, strs: List[str]) -> int:
        map = Counter(strs)
        strs.sort(key = lambda s: -len(s))
        for i in range(len(strs)):
            s = strs[i]
            if map[s] > 1: continue
            need_continue = False
            for j in range(i):
                i1 = 0
                for c in strs[j]:
                    if s[i1] == c:
                        i1 += 1
                    if i1 == len(s):
                        break
                if i1 == len(s):
                    need_continue = True
                    break
            if need_continue: continue
            return len(s)
        return -1`,
        },
        // {
        //     script: Script.RUST,
        //     time: 53,
        //     memory: 13.54,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '72. 编辑距离',
    url: 'https://leetcode.cn/problems/edit-distance',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。`,
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
            desc: 'dp判断每种情况下的最小操作数',
            code: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n1, n2 = len(word1), len(word2)
        @cache
        def dfs(i1: int, i2: int) -> int:
            if i1 == n1: return n2 - i2
            if i2 == n2: return n1 - i1
            if word1[i1] == word2[i2]: return dfs(i1 + 1, i2 + 1)
            return min(
                dfs(i1 + 1, i2) + 1,    # i1 删除一个字符
                dfs(i1, i2 + 1) + 1,    # i1 插入一个字符
                dfs(i1 + 1, i2 + 1) + 1 # i1 替换一个字符
            )
        return dfs(0, 0) `,
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

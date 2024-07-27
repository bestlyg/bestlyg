import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3106. 满足距离约束且字典序最小的字符串',
    url: 'https://leetcode.cn/problems/lexicographically-smallest-string-after-operations-with-constraint',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `你可以对字符串 s 执行 任意次 操作。在每次操作中，可以将 s 中的一个字母 改变 为 任意 其他小写英文字母。返回一个字符串，表示在执行一些操作后你可以得到的 字典序最小 的字符串 t ，且满足 distance(s, t) <= k 。`,
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
            time: 48,
            memory: 16.46,
            desc: '贪心遍历',
            code: `class Solution:
    def getSmallestString(self, s: str, k: int) -> str:
        arr = list(s)
        orda = ord('a')
        for i in range(len(arr)):
            ordc = ord(arr[i])
            min_to_a = min(ordc - orda, orda + 26 - ordc)
            if min_to_a <= k:
                arr[i] = 'a'
                k -= min_to_a
            else:
                ordc -= orda
                arr[i] = chr(orda + min(ordc - k, (ordc + k) % 26))
                break
        return ''.join(arr)`,
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

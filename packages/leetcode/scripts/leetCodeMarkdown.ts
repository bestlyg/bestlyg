import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2663. 字典序最小的美丽字符串',
    url: 'https://leetcode.cn/problems/lexicographically-smallest-beautiful-string',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你找出并返回一个长度为 n 的美丽字符串，该字符串还满足：在字典序大于 s 的所有美丽字符串中字典序最小。如果不存在这样的字符串，则返回一个空字符串。`,
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
            time: 205,
            memory: 18.18,
            desc: '贪心遍历',
            code: `class Solution:
    def smallestBeautifulString(self, s: str, k: int) -> str:
        arr = list(s)
        ord0 = ord('a')
        def get_next(c: str) -> str:
            ordc = ord(c)
            if ordc - ord0 + 1 == k:
                return None
            return chr(ordc + 1)
        for i in range(len(arr) - 1, -1, -1):
            next_ord = get_next(arr[i])
            while next_ord and (i > 0 and next_ord == arr[i - 1] or i > 1 and next_ord == arr[i - 2]):
                next_ord = get_next(next_ord)
            if next_ord:
                arr[i] = next_ord
                starti = i + 1
                if 0 < i < len(arr) - 1 and arr[i - 1] == 'a':
                    arr[starti] = 'b'
                    starti += 1
                for j in range(starti, len(arr)):
                    cur = 0
                    ch = chr(cur + ord0)
                    while ch and (j > 0 and ch == arr[j - 1] or j > 1 and ch == arr[j - 2]):
                        cur = (cur + 1) % k
                        ch = chr(cur + ord0)
                    arr[j] = ch
                break
        res = ''.join(arr)
        return res if res > s else ''`,
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

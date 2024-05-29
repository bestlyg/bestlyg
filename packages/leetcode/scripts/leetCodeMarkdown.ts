import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2982. 找出出现至少三次的最长特殊子字符串 II',
    url: 'https://leetcode.cn/problems/find-longest-special-substring-that-occurs-thrice-ii',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `返回在 s 中出现 至少三次 的 最长特殊子字符串 的长度，如果不存在出现至少三次的特殊子字符串，则返回 -1 。`,
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
        {
            script: Script.PY,
            // date: new Date('2024.02.07').getTime(),
            time: 461,
            memory: 18.88,
            desc: '哈希存储所有相同字符的串的长度，判断同类串的最大长度',
            code: `def get_longest(arr: Counter) -> int:
        max_key = max(arr.keys())
        if arr[max_key] >= 3:
            return max_key
        elif arr[max_key] * 2 + arr[max_key - 1] >= 3:
            return max_key - 1
        return max_key - 2
    class Solution:
        def maximumLength(self, s: str) -> int:
            n = len(s)
            map = defaultdict(Counter)
            i = 0
            while i < n:
                j = i
                while i < n and s[j] == s[i]: i += 1
                map[s[j]][i - j] += 1
            vmax = max([get_longest(arr) for arr in map.values()])
            return vmax if vmax else -1`,
        },

        //         {
        //             script: Script.CPP,
        //             time: 44,
        //             memory: 70.5,
        //             desc: '同上',
        //             code: `class Solution {
        // public:
        //     int getScore(vector<int>& player) {
        //         int cur = 0, sum = 0;
        //         for (auto &v: player) {
        //             sum += v + v * ((cur & 0b11) != 0);
        //             cur = cur << 1 | (v == 10);
        //         }
        //         return sum;
        //     }
        //     int isWinner(vector<int>& player1, vector<int>& player2) {
        //         int s1 = getScore(player1), s2 = getScore(player2);
        //         return s1 > s2 ? 1 : s2 > s1 ? 2 : 0;
        //     }
        // };`,
        //         },
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

import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '514. 自由之路',
    url: 'https://leetcode.cn/problems/freedom-trail',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个字符串 ring ，表示刻在外环上的编码；给定另一个字符串 key ，表示需要拼写的关键词。您需要算出能够拼写关键词中所有字符的最少步数。`,
    solutions: [
        {
            date: new Date('2020.11.11').getTime(),
            script: Script.JS,
            time: 140,
            memory: 45.82,
            desc: 'dp',
            code: `const getIdx = (str, v) => str.codePointAt(v) - 'a'.codePointAt(0);
var findRotateSteps = function(ring, key) {
    const n = ring.length, m = key.length;
    const pos = new Array(26).fill(0).map(v => []);
    for (let i = 0; i < n; ++i) {
        pos[getIdx(ring, i)].push(i);
    }
    const dp = new Array(m).fill(0).map(v => new Array(n).fill(Number.MAX_SAFE_INTEGER));
    for (const i of pos[getIdx(key, 0)]) {
        dp[0][i] = Math.min(i, n - i) + 1;
    }
    for (let i = 1; i < m; ++i) {
        for (const j of pos[getIdx(key, i)]) {
            for (const k of pos[getIdx(key, i - 1)]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + Math.min(Math.abs(j - k), n - Math.abs(j - k)) + 1);
            }
        }
    }
    return dp[m - 1].reduce((pre, cur) => Math.min(pre, cur), Number.MAX_SAFE_INTEGER);
};`,
        },
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
            time: 108,
            memory: 17.4,
            desc: 'dfs',
            code: `class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        arr = defaultdict(list)
        for i in range(len(ring)):
            arr[ring[i]].append(i)
        @cache
        def dfs(i1: int, i2: int) -> int:
            if i2 == len(key): return 0
            if ring[i1] == key[i2]: return dfs(i1, i2 + 1) + 1
            return min(
                dfs(next_i, i2 + 1) + min(abs(i1 - next_i), len(ring) - abs(i1 - next_i)) + 1
                for next_i in arr[key[i2]]
            )
        return dfs(0, 0)`,
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
        //     time: 441,
        //     memory: 21.37,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

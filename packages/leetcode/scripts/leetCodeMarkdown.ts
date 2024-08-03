import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3143. 正方形中的最多点数',
    url: 'https://leetcode.cn/problems/maximum-points-inside-the-square',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回 合法 正方形中可以包含的 最多 点数。`,
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
            time: 154,
            memory: 47.63,
            desc: '排序后遍历',
            code: `class Solution:
    def maxPointsInsideSquare(self, points: List[List[int]], s: str) -> int:
        get_edge = lambda i: max(abs(points[i][0]), abs(points[i][1]))
        idxs = sorted([i for i in range(len(points))], key = get_edge)
        used = set()
        res = i = 0
        while i < len(idxs):
            edge = get_edge(idxs[i])
            cnt = 1
            if s[idxs[i]] in used: break
            used.add(s[idxs[i]])
            while i + 1 < len(idxs) and get_edge(idxs[i + 1]) == edge:
                i += 1
                if s[idxs[i]] in used: return res
                used.add(s[idxs[i]])
                cnt += 1
            res += cnt
            i += 1
        return res`,
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

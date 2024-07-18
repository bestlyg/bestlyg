import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3112. 访问消失节点的最少时间',
    url: 'https://leetcode.cn/problems/minimum-time-to-visit-disappearing-nodes',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回数组 answer ，answer[i] 表示从节点 0 到节点 i 需要的 最少 单位时间。如果从节点 0 出发 无法 到达节点 i ，那么 answer[i] 为 -1 。`,
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
            time: 921,
            memory: 72.21,
            desc: '图短路求出当前点到其他点的最短时间',
            code: `class Solution:
    def minimumTime(self, n: int, edges: List[List[int]], disappear: List[int]) -> List[int]:
        nodes = [defaultdict(lambda :inf) for _ in range(n)]
        for n1, n2, v in edges:
            if n1 != n2:
                nodes[n1][n2] = nodes[n2][n1] = min(nodes[n1][n2], v)
        q = [(0, 0)]
        res = [-1] * n
        res[0] = 0
        used = [False] * n
        while q:
            t, node = heappop(q)
            if used[node]: continue
            used[node] = True
            res[node] = t
            for child in nodes[node].keys():
                next_t = t + nodes[node][child]
                if not used[child] and next_t < disappear[child]:
                    heappush(q, (next_t, child))
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

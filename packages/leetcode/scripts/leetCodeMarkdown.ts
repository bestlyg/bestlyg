import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '3067. 在带权树网络中统计可连接服务器对数目',
    url: 'https://leetcode.cn/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个长度为 n 的整数数组 count ，其中 count[i] 表示通过服务器 i 可连接 的服务器对的 数目 。`,
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
            time: 797,
            memory: 18.23,
            desc: '模拟',
            code: `class Solution:
    def countPairsOfConnectableServers(self, edges: List[List[int]], signalSpeed: int) -> List[int]:
        nodes = [[] for _ in range(len(edges) + 1)]
        for n1, n2, w in edges:
            nodes[n1].append((n2, w))
            nodes[n2].append((n1, w))
        def dfs(cur: int, prev: int, sum: int) -> int:
            res = 0
            if sum % signalSpeed == 0: res += 1
            for next, w in nodes[cur]:
                if next != prev:
                    res += dfs(next, cur, sum + w)
            return res
        def get_cnt(cur: int) -> int:
            if len(nodes[cur]) == 1: return 0
            arr = [dfs(next, cur, w) for next, w in nodes[cur]]
            vsum = sum(arr)
            res = 0
            for v in arr:
                vsum -= v
                res += v * vsum
            return res
        return [get_cnt(i) for i in range(len(nodes))]`,
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

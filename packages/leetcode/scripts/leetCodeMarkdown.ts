import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2642. 设计可以求最短路径的图类',
    url: 'https://leetcode.cn/problems/design-graph-with-shortest-path-calculator',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你实现一个 Graph 类。`,
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
            time: 349,
            memory: 20.49,
            desc: '图的最短路',
            code: `class Node:
    def __init__(self):
        self.f = []
        self.t = []

class Graph:
    def __init__(self, n: int, edges: List[List[int]]):
        self.n = n
        self.nodes = [Node() for _ in range(n)]
        for [f, t, cost] in edges:
            self.nodes[f].t.append((t, cost))
            self.nodes[t].f.append((f, cost))

    def addEdge(self, edge: List[int]) -> None:
        self.nodes[edge[0]].t.append((edge[1], edge[2]))

    def shortestPath(self, node1: int, node2: int) -> int:
        q = [(0, node1)]
        used = {}
        while q: 
            cost, node = heappop(q)
            if node == node2: return cost
            for next_node, next_cost in self.nodes[node].t:
                cost2 = next_cost + cost
                if next_node not in used or used[next_node] > cost2:
                    heappush(q, (cost2, next_node))
                    used[next_node] = cost2
        return -1`,
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

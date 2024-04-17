import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '928. 尽量减少恶意软件的传播 II',
    url: 'https://leetcode.cn/problems/minimize-malware-spread-ii/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `我们可以从 initial 中删除一个节点，并完全移除该节点以及从该节点到任何其他节点的任何连接。请返回移除后能够使 M(initial) 最小化的节点。如果有多个节点满足条件，返回索引 最小的节点 。`,
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
            time: 601,
            memory: 19.4,
            desc: '并查集',
            code: `class UnionFind:
    def __init__(self, n) -> None:
        self.n = n
        self.data = [i for i in range(0, n)]
        self.sizes = [1] * n
        self.cnt = n
    def size(self, v: int) -> int:
        return self.sizes[self.find(v)]
    def find(self, v: int) -> int:
        if self.data[v] != v:
            self.data[v] = self.find(self.data[v])
        return self.data[v]
    def uni(self, v1: int, v2: int):
        p1 = self.find(v1)
        p2 = self.find(v2)
        if p1 != p2:
            self.sizes[p1] += self.sizes[p2]
            self.cnt -= self.sizes[p2]
            self.data[p2] = p1
    def same(self, v1: int, v2: int):
        return self.find(v1) == self.find(v2)
class Solution:
    def minMalwareSpread(self, graph: List[List[int]], initial: List[int]) -> int:
        n = len(graph)
        def get(ignore_index: int) -> int:
            uf = UnionFind(n)
            res = 0
            for i in range(n):
                for j in range(n):
                    if i == ignore_index or j == ignore_index: continue
                    if graph[i][j]: uf.uni(i, j)
            used = set()
            for i in initial:
                if i != ignore_index:
                    parent = uf.find(i)
                    if parent not in used:
                        used.add(parent)
                        res += uf.size(parent)
            return (res, ignore_index)
        return min(get(i) for i in initial)[1]`,
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

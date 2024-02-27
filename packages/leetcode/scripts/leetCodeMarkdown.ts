import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2867. 统计树中的合法路径数目',
    url: 'https://leetcode.cn/problems/count-valid-paths-in-a-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回树中的 合法路径数目 。`,
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
            time: 322,
            memory: 58.63,
            desc: '预处理好质数表，通过遍历所有质数，找到以当前质数为根结点的时候，所有子树的长度，进行两两相乘',
            code: `def get_primes2(n: int) -> List[bool]:
        n += 1
        primes = [True for _ in range(n)]
        primes[0] = primes[1] = False
        for i in range(2, n):
            if primes[i]:
                j = 2
                while i * j < n:
                    primes[i*j] = False
                    j += 1
        return primes
    primes = get_primes2(10 ** 5 + 1)
    
    class Solution:
        def countPaths(self, n: int, edges: List[List[int]]) -> int:
            nodes = [[] for _ in range(n + 1)]
            for n1, n2 in edges:
                nodes[n1].append(n2)
                nodes[n2].append(n1)
            ans = 0
    
            cache = defaultdict(int)
            def dfs(arr: List[int], node: int, parent: int):
                if primes[node]: return
                arr.append(node)
                ans = 1
                for child in nodes[node]:
                    if not primes[child] and child != parent:
                        ans += dfs(arr, child, node)
                return ans
    
            for node in range(1, n + 1):
                if primes[node]:
                    cur = 0
                    for child in nodes[node]:
                        if not primes[child]:
                            if child not in cache:
                                arr = []
                                res = dfs(arr, child, node)
                                for item in arr: cache[item] = res
                            ans += cache[child] * cur
                            cur += cache[child]
                    ans += cur
        return ans`,
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

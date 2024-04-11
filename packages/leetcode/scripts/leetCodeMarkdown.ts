import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1766. 互质树',
    url: 'https://leetcode.cn/problems/tree-of-coprimes',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个大小为 n 的数组 ans ，其中 ans[i]是离节点 i 最近的祖先节点且满足 nums[i] 和 nums[ans[i]] 是 互质的 ，如果不存在这样的祖先节点，ans[i] 为 -1 。`,
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
            time: 1017,
            memory: 66.86,
            desc: '预处理后dfs',
            code: `primes = [0 for _ in range(51)]
    for num1 in range(1, 51):
        for num2 in range(1, 51):
            if gcd(num1, num2) == 1:
                primes[num1] |= 1 << num2
                primes[num2] |= 1 << num1
    
    class Solution:
        def getCoprimes(self, nums: List[int], edges: List[List[int]]) -> List[int]:
            n = len(nums)
            nodes = [[] for _ in range(n)]
            for n1, n2 in edges:
                nodes[n1].append(n2)
                nodes[n2].append(n1)
            ans = [-1 for _ in range(n)]
            def dfs(node: int, arr: List[Tuple[int, int]], parent: int, level: int):
                num1 = nums[node]
                cur = (-1, -1)
                for num2 in range(1, 51):
                    if arr[num2][0] != -1 and primes[num1] & (1 << num2) and (cur[1] == -1 or arr[num2][1] > cur[1]):
                        cur = arr[num2]
                ans[node] = cur[0]
                oldv = arr[num1]
                arr[num1] = (node, level)
                for child in nodes[node]:
                    if child != parent:
                        dfs(child, arr, node, level + 1)
                arr[num1] = oldv
            dfs(0, [(-1, -1) for _ in range(51)], -1, 0)
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

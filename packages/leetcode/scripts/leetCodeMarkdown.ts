import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1595. 连通两组点的最小成本',
    url: 'https://leetcode.cn/problems/minimum-cost-to-connect-two-groups-of-points/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你两组点，其中第一组中有 size1 个点，第二组中有 size2 个点，且 size1 >= size2 。任意两点间的连接成本 cost 由大小为 size1 x size2 矩阵给出，其中 cost[i][j] 是第一组中的点 i 和第二组中的点 j 的连接成本。如果两个组中的每个点都与另一组中的一个或多个点连接，则称这两组点是连通的。换言之，第一组中的每个点必须至少与第二组中的一个点连接，且第二组中的每个点必须至少与第一组中的一个点连接。返回连通两组点所需的最小成本。`,
    solutions: [
        //         {
        //             script: Script.TS,
        //             time: 156,
        //             memory: 69,
        //             desc: '对于每个是对象的value，进行dfs',
        //             code: `type Obj = Record<any, any>;

        // function compactObject(obj: Obj): Obj {
        //     const res: any = Array.isArray(obj) ? [] : {};
        //     for (const [k, v] of Object.entries(obj)) {
        //         if (Boolean(v)) {
        //             const newv = typeof v === 'object' ? compactObject(v) : v;
        //             if (Array.isArray(obj)) res.push(newv);
        //             else res[k] = newv;
        //         }
        //     }
        //     return res;
        // };`,
        // },
        {
            script: Script.CPP,
            time: 104,
            memory: 9.8,
            desc: 'dp[i][j]表示只有i个第一行元素的时候，已经使用了bitcount(j)个第二行元素时的最小开销',
            code: `class Solution {
public:
    int connectTwoGroups(vector<vector<int>>& cost) {
        int n = cost.size(), m = cost[0].size();
        vector<vector<int>>cache(n + 1, vector<int>(1 << m, 0x3f3f3f3f));
        cache[0][0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int mask = 0; mask < (1 << m); mask++) {
                for (int j = 0; j < m; j++) {
                    if (mask & (1 << j)) {
                        cache[i][mask] = min(cache[i][mask], cache[i][mask & ~(1 << j)] + cost[i - 1][j]);
                        cache[i][mask] = min(cache[i][mask], cache[i - 1][mask] + cost[i - 1][j]);
                        cache[i][mask] = min(cache[i][mask], cache[i - 1][mask & ~(1 << j)] + cost[i - 1][j]);
                    }
                }
            }
        }
        return cache[n][(1 << m) - 1];
    }
};`,
        },
        {
            script: Script.PY3,
            time: 1308,
            memory: 16.8,
            desc: '同上',
            code: `class Solution:
    def connectTwoGroups(self, cost: List[List[int]]) -> int:
        n = len(cost)
        m = len(cost[0])
        cache = [[inf for _ in range(1 << m)] for _ in range(n + 1)]
        cache[0][0] = 0
        for i in range(1, n+1):
            for mask in range(1 << m):
                for j in range(m):
                    if mask & (1 << j):
                        cache[i][mask] = min(
                            cache[i][mask], cache[i][mask & ~(1 << j)] + cost[i - 1][j])
                        cache[i][mask] = min(
                            cache[i][mask], cache[i - 1][mask] + cost[i - 1][j])
                        cache[i][mask] = min(
                            cache[i][mask], cache[i - 1][mask & ~(1 << j)] + cost[i - 1][j])
        return cache[n][(1 << m) - 1]`,
        },
        {
            script: Script.RUST,
            time: 16,
            memory: 2.3,
            desc: '同上',
            code: `impl Solution {
    pub fn connect_two_groups(cost: Vec<Vec<i32>>) -> i32 {
        let n = cost.len();
        let m = cost[0].len();
        let mut cache = vec![vec![0x3f3f3f3f; 1 << m]; n + 1];
        cache[0][0] = 0;
        for i in 1..=n {
            for mask in 0..(1 << m) {
                for j in 0..m {
                    if (mask & (1 << j)) != 0 {
                        cache[i][mask] = cache[i][mask]
                            .min(cache[i][mask & !(1 << j)] + cost[i - 1][j])
                            .min(cache[i - 1][mask] + cost[i - 1][j])
                            .min(cache[i - 1][mask & !(1 << j)] + cost[i - 1][j]);
                    }
                }
            }
        }
        return cache[n][(1 << m) - 1];
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;

import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1761. 一个图中连通三元组的最小度数',
    url: 'https://leetcode.cn/problems/minimum-degree-of-a-connected-trio-in-a-graph/description/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回所有连通三元组中度数的 最小值 ，如果图中没有连通三元组，那么返回 -1 。`,
    solutions: [
        // {
        //     date: new Date('2020.04.26').getTime(),
        //     script: Script.JS,
        //     time: 384,
        //     memory: 44.78,
        //     desc: '归并排序',
        //     code: ``,
        // },
        // {
        //     date: new Date('2021.05.13').getTime(),
        //     script: Script.TS,
        //     time: 220,
        //     memory: 48.3,
        //     desc: '归并排序',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 1896,
            memory: 53.2,
            desc: '枚举',
            code: `class Solution {
public:
    int minTrioDegree(int n, vector<vector<int>>& edges) {
        vector<unordered_set<int>> nodes(n);
        for (auto &edge : edges) {
            nodes[edge[0] - 1].insert(edge[1] - 1);
            nodes[edge[1] - 1].insert(edge[0] - 1);
        }
        int res = INT_MAX;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (!nodes[i].count(j)) continue;
                for (int k = j + 1; k < n; k++) {
                    if (!nodes[i].count(k) || !nodes[j].count(k)) continue;
                    res = min(res, (int)nodes[i].size() + (int)nodes[j].size() + (int)nodes[k].size() - 6);
                }
            }
        }
        return res == INT_MAX ? -1 : res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 4360,
            memory: 40.23,
            desc: '同上',
            code: `class Solution:
    def minTrioDegree(self, n: int, edges: List[List[int]]) -> int:
        nodes = [set() for _ in range(n)]
        for [n0, n1] in edges:
            nodes[n0-1].add(n1-1)
            nodes[n1-1].add(n0-1)
        res = inf
        for i in range(n):
            for j in range(i + 1, n):
                if not j in nodes[i]:
                    continue
                for k in range(j + 1, n):
                    if not k in nodes[i] or not k in nodes[j]:
                        continue
                    res = min(res, len(nodes[i]) +
                              len(nodes[j]) + len(nodes[k]) - 6)
        return res if res != inf else -1`,
        },
        {
            script: Script.RUST,
            time: 12,
            memory: 2.24,
            desc: '同上',
            code: `impl Solution {
    pub fn min_trio_degree(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut nodes = vec![std::collections::HashSet::new(); n];
        for edge in edges {
            let (n0, n1) = (edge[0] as usize - 1, edge[1] as usize - 1);
            nodes[n0].insert(n1);
            nodes[n1].insert(n0);
        }
        let mut res = i32::MAX;
        for i in 0..n {
            for j in i + 1..n {
                if nodes[i].contains(&j) {
                    for k in j + 1..n {
                        if nodes[i].contains(&k) && nodes[j].contains(&k) {
                            res = res
                                .min((nodes[i].len() + nodes[j].len() + nodes[k].len() - 6) as i32)
                        }
                    }
                }
            }
        }
        if res == i32::MAX {
            -1
        } else {
            res
        }
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;

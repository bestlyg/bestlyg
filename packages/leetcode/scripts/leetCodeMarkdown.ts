import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '1782. 统计点对的数目',
    url: 'https://leetcode.cn/problems/count-pairs-of-nodes/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `请你返回一个数组 answers ，其中 answers.length == queries.length 且 answers[j] 是第 j 个查询的答案。`,
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
            time: 836,
            memory: 181.42,
            desc: '两个节点的边总和为 n[a]+n[b]-m[a][b] 要减去共有的边，先统计两个节点边和大于目标值的个数。',
            code: `class Solution {
public:
    vector<int> countPairs(int n, vector<vector<int>>& edges, vector<int>& queries) {
        vector<int> nodes(n, 0);
        unordered_map<int, unordered_map<int, int>> m;
        for (auto &edge : edges) {
            int x = edge[0] - 1, y = edge[1] - 1;
            if (x > y) swap(x, y);
            nodes[x] += 1;
            nodes[y] += 1;
            m[x][y] += 1;
        }
        vector<int> res, list = nodes;
        sort(list.begin(), list.end());
        for (auto &query : queries) {
            int val = 0;
            for (int i = 0; i < n; i++) {
                int target = query - list[i], l = i + 1, r = n;
                while (l < r) {
                    int m = (l + r) / 2;
                    if (list[m] > target) r = m;
                    else l = m + 1;
                }
                val += n - l;
            }
            for (auto &item1 : m) {
                int x = item1.first;
                for (auto &item2 : item1.second) {
                    int y = item2.first, cnt = item2.second;
                    if (nodes[x] + nodes[y] > query && nodes[x] + nodes[y] - cnt <= query) val -= 1;
                }
            }
            res.push_back(val);
        }
        return res;
    }
};`,
        },
        // {
        //     script: Script.PY,
        //     time: 52,
        //     memory: 16.38,
        //     desc: '同上',
        //     code: ``,
        // },
        // {
        //     script: Script.RUST,
        //     time: 0,
        //     memory: 2.15,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

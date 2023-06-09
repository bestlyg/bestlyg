import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2699. 修改图中的边权',
    url: 'https://leetcode.cn/problems/modify-graph-edge-weights/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个 n 个节点的 无向带权连通 图，节点编号为 0 到 n - 1 ，再给你一个整数数组 edges ，其中 edges[i] = [ai, bi, wi] 表示节点 ai 和 bi 之间有一条边权为 wi 的边。部分边的边权为 -1（wi = -1），其他边的边权都为 正 数（wi > 0）。你需要将所有边权为 -1 的边都修改为范围 [1, 2 * 109] 中的 正整数 ，使得从节点 source 到节点 destination 的 最短距离 为整数 target 。如果有 多种 修改方案可以使 source 和 destination 之间的最短距离等于 target ，你可以返回任意一种方案。如果存在使 source 到 destination 最短距离为 target 的方案，请你按任意顺序返回包含所有边的数组（包括未修改边权的边）。如果不存在这样的方案，请你返回一个 空数组 。`,
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
            time: 792,
            memory: 255.6,
            desc: 'dijkstra对于所有正数边求解，如果d小于target则无解，否则每次增加一条负数边判断是否有解',
            code: `#define X first
#define Y second
#define pii pair<int, int>
struct QNode {
    int cur, sum;
    QNode(int cur, int sum = 0): cur(cur), sum(sum) {}
};
class Solution {
public:
    vector<vector<int>> modifiedGraphEdges(int n, vector<vector<int>>& edges, int source, int destination, int target) {
        vector<vector<int>> nodes(n, vector<int>(n, 0));
        for (auto &e : edges) {
            nodes[e[0]][e[1]] = e[2];
            nodes[e[1]][e[0]] = e[2];
        }
        int d = dijkstra(n, nodes, source, destination);
        vector<vector<int>> res;
        if (d < target) return res;
        bool success = d == target;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nodes[i][j] > 0) res.push_back(vector<int>{ i, j, nodes[i][j] });
                else if (nodes[i][j] == 0) continue;
                else if (success) res.push_back(vector<int>{ i, j, (int)2e9 });
                else {
                    nodes[i][j] = 1;
                    nodes[j][i] = 1;
                    int d = dijkstra(n, nodes, source, destination);
                    if (d > target) {
                        res.push_back(vector<int>{ i, j, 1 });
                    } else {
                        res.push_back(vector<int>{ i, j, target - d + 1 });
                        success = true;
                    }
                }
            }
        }
        return success ? res : vector<vector<int>>{};
    }
    int dijkstra(int n, vector<vector<int>>& nodes, int from, int to) {
        int res = 0;
        auto cmp = [&](QNode &v1, QNode &v2) { return v2.sum < v1.sum; };
        priority_queue<QNode, vector<QNode>, decltype(cmp)> q(cmp);
        q.push(QNode(from, 0));
        vector<vector<bool>> used(n, vector<bool>(n, false));
        while (q.size()) {
            auto node = q.top();
            if (node.cur == to) return node.sum;
            q.pop();
            for (int i = 0; i < n; i++) {
                if (nodes[node.cur][i] > 0 && !used[node.cur][i]) {
                    QNode next = node;
                    next.cur = i;
                    next.sum = node.sum + nodes[node.cur][i];
                    used[node.cur][i] = true;
                    q.push(move(next));
                }
            }
        }
        return INT_MAX;
    }
};`,
        },
        // {
        //     script: Script.PY3,
        //     time: 212,
        //     memory: 20.6,
        //     desc: '同上',
        //     code: ``,
        // },
        // {
        //     script: Script.RUST,
        //     time: 44,
        //     memory: 3,
        //     desc: '同上',
        //     code: ``,
        // },
    ],
};

export default leetCodeMarkdown;

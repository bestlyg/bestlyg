import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '834. 树中距离之和',
    url: 'https://leetcode.cn/problems/sum-of-distances-in-tree/',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给定一个无向、连通的树。树中有 n 个标记为 0...n-1 的节点以及 n-1 条边 。给定整数 n 和数组 edges ， edges[i] = [ai, bi]表示树中的节点 ai 和 bi 之间有一条边。返回长度为 n 的数组 answer ，其中 answer[i] 是树中第 i 个节点与所有其他节点之间的距离之和。`,
    solutions: [
        {
            date: new Date('2020/10/06').getTime(),
            script: Script.JS,
            time: 224,
            memory: 54.2,
            desc: 'dfs',
            code: `/**
* @param {number} N
* @param {number[][]} edges
* @return {number[]}
*/
let ans, sz, dp, graph;
const dfs = (u, f) => {
    sz[u] = 1;
    dp[u] = 0;
    for (const v of graph[u]) {
        if (v === f) {
            continue;
        }
        dfs(v, u);
        dp[u] += dp[v] + sz[v];
        sz[u] += sz[v];
    }
}
const dfs2 = (u, f) => {
    ans[u] = dp[u];
    for (const v of graph[u]) {
        if (v === f) {
            continue;
        }
        const pu = dp[u], pv = dp[v];
        const su = sz[u], sv = sz[v];

        dp[u] -= dp[v] + sz[v];
        sz[u] -= sz[v];
        dp[v] += dp[u] + sz[u];
        sz[v] += sz[u];

        dfs2(v, u);

        dp[u] = pu, dp[v] = pv;
        sz[u] = su, sz[v] = sv;
    }
}
var sumOfDistancesInTree = function(N, edges) {
    ans = new Array(N).fill(0);
    sz = new Array(N).fill(0);
    dp = new Array(N).fill(0);
    graph = new Array(N).fill(0).map(v => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    dfs(0, -1);
    dfs2(0, -1);
    return ans;
};`,
        },
        {
            script: Script.CPP,
            time: 232,
            memory: 106.4,
            desc: 'dfs',
            code: `#define X first
#define Y second
#define pii pair<int, int>
class Solution {
public:
    vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
        vector<int> res(n, 0);
        vector<vector<int>> nodes(n);
        for (auto &edge : edges) {
            nodes[edge[0]].push_back(edge[1]);
            nodes[edge[1]].push_back(edge[0]);
        }
        // X 总共有几个， Y 总路径和
        vector<pii> cache(n);
        function<pii(int, int)> find = [&](int cur, int p) -> pii {
            if (nodes[cur].size() == 1 && nodes[cur][0] == p) return cache[cur] = make_pair(1, 1);
            pii ans = make_pair(1, 1);
            for (auto &child : nodes[cur]) {
                if (child != p) {
                    auto res = find(child, cur);
                    ans.X += res.X;
                    ans.Y += res.X + res.Y;
                }
            }
            cache[cur] = ans;
            return ans;
        };
        find(0, -1);
        function<void(int, int, int)> dfs = [&](int cur, int p, int sum) {
            res[cur] = sum + cache[cur].Y - cache[cur].X;
            for (auto &child : nodes[cur]) {
                if (child != p) dfs(child, cur, res[cur] - cache[child].Y + n - cache[child].X);
            }
        };
        dfs(0, -1, 0);
        return res;
    }
};`,
        },
        {
            script: Script.PY,
            time: 404,
            memory: 69.3,
            desc: '同上',
            code: `class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        res = [0 for _ in range(n)]
        nodes = [[] for _ in range(n)]
        for edge in edges:
            nodes[edge[0]].append(edge[1])
            nodes[edge[1]].append(edge[0])
        cache = [[] for _ in range(n)]

        def find(cur: int, p: int) -> List[int]:
            ans = [1, 1]
            if len(nodes[cur]) == 1 and nodes[cur][0] == p:
                cache[cur] = ans
            else:
                for child in nodes[cur]:
                    if child != p:
                        res = find(child, cur)
                        ans[0] += res[0]
                        ans[1] += res[0] + res[1]
                cache[cur] = ans
            return ans

        find(0, -1)
        
        def dfs(cur: int, p: int, sum: int):
            res[cur] = sum + cache[cur][1] - cache[cur][0]
            for child in nodes[cur]:
                if child != p:
                    dfs(child, cur, res[cur] - cache[child]
                        [1] + n - cache[child][0])
        dfs(0, -1, 0)
        return res`,
        },
        {
            script: Script.RUST,
            time: 48,
            memory: 8.8,
            desc: '同上',
            code: `fn find(nodes: &Vec<Vec<usize>>, cache: &mut Vec<(i32, i32)>, cur: usize, p: usize) -> (i32, i32) {
    let mut ans: (i32, i32) = (1, 1);
    if !(nodes[cur].len() == 1 && nodes[cur][0] == p) {
        for child in &nodes[cur] {
            if *child != p {
                let res = find(nodes, cache, *child, cur);
                ans.0 += res.0;
                ans.1 += res.0 + res.1;
            }
        }
    }
    cache[cur] = ans;
    ans
}
fn dfs(
    res: &mut Vec<i32>,
    nodes: &Vec<Vec<usize>>,
    cache: &Vec<(i32, i32)>,
    n: usize,
    cur: usize,
    p: usize,
    sum: i32,
) {
    res[cur] = sum + cache[cur].1 - cache[cur].0;
    for child in &nodes[cur] {
        if *child != p {
            dfs(
                res,
                nodes,
                cache,
                n,
                *child,
                cur,
                res[cur] - cache[*child].1 + (n as i32) - cache[*child].0,
            );
        }
    }
}
impl Solution {
    pub fn sum_of_distances_in_tree(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut res = vec![0; n];
        let mut nodes = vec![vec![]; n];
        for edge in edges {
            nodes[edge[0] as usize].push(edge[1] as usize);
            nodes[edge[1] as usize].push(edge[0] as usize);
        }
        let mut cache = vec![(0, 0); n];
        find(&nodes, &mut cache, 0, usize::MAX);
        dfs(&mut res, &nodes, &cache, n, 0, usize::MAX, 0);
        res
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;

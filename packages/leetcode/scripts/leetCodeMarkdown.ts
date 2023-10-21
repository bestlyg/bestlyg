import { Markdown, Difficulty, Tag, Script } from '@/base';
import { backquote } from '@/utils';

const leetCodeMarkdown: Markdown = {
    exist: !true,
    name: '2316. 统计无向图中无法互相到达点对数',
    url: 'https://leetcode.cn/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph',
    difficulty: Difficulty.简单,
    tag: [],
    desc: `给你一个整数 n ，表示一张 无向图 中有 n 个节点，编号为 0 到 n - 1 。同时给你一个二维整数数组 edges ，其中 edges[i] = [ai, bi] 表示节点 ai 和 bi 之间有一条 无向 边。请你返回 无法互相到达 的不同 点对数目 。`,
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
        //     date: new Date('2020.12.28').getTime(),
        //     script: Script.TS,
        //     time: 120,
        //     memory: 44.6,
        //     desc: 'dp',
        //     code: ``,
        // },
        {
            script: Script.CPP,
            time: 352,
            memory: 130.11,
            desc: '并查集',
            code: `class UnionFind {
public:
    int n;
    vector<int> data, cnt;
    UnionFind(int n) : n(n), data(vector<int>(n, 0)), cnt(vector<int>(n, 1)) {
        iota(data.begin(), data.end(), 0);
    }
    int size(int v) { return cnt[find(v)]; }
    int find(int v) {
        if (data[v] == v) return v;
        return data[v] = find(data[v]);
    }
    void uni(int v1, int v2) {
        int p1 = find(v1), p2 = find(v2);
        if (p1 != p2) cnt[p1] += cnt[p2], data[p2] = p1;
    }
    bool same(int v1, int v2) { return find(v1) == find(v2); }
};
class Solution {
public:
    long long countPairs(int n, vector<vector<int>>& edges) {
        UnionFind uf(n);
        for (auto &edge : edges) uf.uni(edge[0], edge[1]);
        long long res = 0;
        for (int i = 0; i < n; i++) {
            if (uf.data[i] != i) continue;
            res += (long long)uf.cnt[i] * (n - uf.cnt[i]);
        }
        return res / 2;
    }
};`,
        },
        {
            script: Script.PY,
            time: 408,
            memory: 61.26,
            desc: '同上',
            code: `class UnionFind:
    def __init__(self, n) -> None:
        self.n = n
        self.data = [i for i in range(0, n)]
        self.cnt = [1] * n

    def size(self, v: int) -> int:
        return self.cnt[self.find(v)]

    def find(self, v: int) -> int:
        if self.data[v] != v:
            self.data[v] = self.find(self.data[v])
        return self.data[v]

    def uni(self, v1: int, v2: int):
        p1 = self.find(v1)
        p2 = self.find(v2)
        if p1 != p2:
            self.cnt[p1] += self.cnt[p2]
            self.data[p2] = p1

    def same(self, v1: int, v2: int):
        return self.find(v1) == self.find(v2)

class Solution:
    def countPairs(self, n: int, edges: List[List[int]]) -> int:
        uf = UnionFind(n)
        for [n1, n2] in edges:
            uf.uni(n1, n2)
        return sum(uf.cnt[i] * (n - uf.cnt[i]) if uf.data[i] == i else 0 for i in range(n)) // 2
`,
        },
        {
            script: Script.RUST,
            time: 36,
            memory: 14.85,
            desc: '同上',
            code: `pub struct UnionFind {
    pub n: usize,
    pub data: Vec<usize>,
    pub cnt: Vec<usize>,
}
impl UnionFind {
    pub fn new(n: usize) -> Self {
        let mut data = vec![0; n];
        for i in 0..data.len() {
            data[i] = i;
        }
        Self {
            n,
            data,
            cnt: vec![1; n],
        }
    }
    pub fn size(&mut self, v: usize) -> usize {
        let idx = self.find(v);
        self.cnt[idx]
    }
    pub fn find(&mut self, v: usize) -> usize {
        if self.data[v] != v {
            self.data[v] = self.find(self.data[v]);
        }
        self.data[v]
    }
    pub fn uni(&mut self, v1: usize, v2: usize) {
        let p1 = self.find(v1);
        let p2 = self.find(v2);
        if p1 != p2 {
            self.cnt[p1] += self.cnt[p2];
            self.data[p2] = p1;
        }
    }
    pub fn same(&mut self, v1: usize, v2: usize) -> bool {
        self.find(v1) == self.find(v2)
    }
}
impl Solution {
    pub fn count_pairs(n: i32, edges: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        let mut uf = UnionFind::new(n);
        for edge in edges {
            uf.uni(edge[0] as usize, edge[1] as usize);
        }
        (0..n)
            .map(|i| {
                if uf.data[i] != i {
                    0
                } else {
                    uf.cnt[i] * (n - uf.cnt[i])
                }
            })
            .sum::<usize>() as i64
            / 2
    }
}`,
        },
    ],
};

export default leetCodeMarkdown;

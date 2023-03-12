import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1617. 统计子树中城市之间最大距离',
  url: 'https://leetcode.cn/problems/count-subtrees-with-max-distance-between-cities/////',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回一个大小为 n-1 的数组，其中第 d 个元素（下标从 1 开始）是城市间 最大距离 恰好等于 d 的子树数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 156,
      memory: 251.6,
      desc: '二进制枚举所有子树，对每个子树求树的直径',
      code: `class Solution {
public:
    vector<int> countSubgraphsForEachDiameter(int n, vector<vector<int>>& edges) {
        vector<vector<int>> nodes(n);
        for (auto &edge : edges) {
            nodes[edge[0] - 1].push_back(edge[1] - 1);
            nodes[edge[1] - 1].push_back(edge[0] - 1);
        }
        vector<int> res(n - 1, 0);
        for (int i = 1; i < (1 << n); i++) {
            int root = 0, mask = i, last = 0;
            while (((1 << root) & i) == 0) root++;
            queue<int> q;
            q.push(root);
            mask &= ~(1 << root);
            while (q.size()) {
                int cur = q.front();
                last = cur;
                q.pop();
                for (auto &next : nodes[cur]) {
                    if (mask & (1 << next)) {
                        mask &= ~(1 << next);
                        q.push(next);
                    }
                }
            }
            if (mask == 0) {
                int d = dfs(nodes, last, i & ~(1 << last));
                if (d >= 1) res[d - 1]++;
            }
        }
        return res;
    }
    int dfs(vector<vector<int>> &nodes, int root, int mask) {
        if (mask == 0) return 0;
        int res = 0;
        for (auto &next : nodes[root]) {
            if (mask & (1 << next)) {
                res = max(res, dfs(nodes, next, mask & ~(1 << next)) + 1);
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 4088,
      memory: 14.9,
      desc: '同上',
      code: `from queue import Queue
class Solution:
    def countSubgraphsForEachDiameter(self, n: int, edges: List[List[int]]) -> List[int]:
        nodes = [[] for _ in range(n)]
        for n1, n2 in edges:
            nodes[n1-1].append(n2-1)
            nodes[n2-1].append(n1-1)
        def dfs(root: int, mask: int):
            if mask == 0:
                return 0
            res = 0
            for nextNode in nodes[root]:
                if mask & (1 << nextNode):
                    resd = dfs(nextNode, mask & ~(1 << nextNode))
                    if resd != -1:
                        res = max(res, resd+1)
            return res

        res = [0] * (n-1)
        for i in range(1, 1 << n):
            root, mask, last = 0, i, 0
            while ((1 << root) & i) == 0:
                root += 1
            q = Queue()
            q.put(root)
            mask &= ~(1 << root)
            while q.qsize():
                cur = q.get()
                last = cur
                for nextNode in nodes[cur]:
                    if mask & (1 << nextNode):
                        mask &= ~(1 << nextNode)
                        q.put(nextNode)
            if mask == 0:
                d = dfs(last, i & ~(1 << last))
                if d >= 1:
                    res[d-1] += 1
        return res`,
    },
    {
      script: Script.RUST,
      time: 16,
      memory: 2.2,
      desc: '同上',
      code: `impl Solution {
    pub fn count_subgraphs_for_each_diameter(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut nodes: Vec<Vec<usize>> = vec![vec![]; n];
        for edge in edges {
            let (n1, n2) = (edge[0] as usize, edge[1] as usize);
            nodes[n1 - 1].push(n2 - 1);
            nodes[n2 - 1].push(n1 - 1);
        }
        let mut res = vec![0; n - 1];
        for i in 1..(1 << n) {
            let i = i as usize;
            let (mut root, mut mask, mut last) = (0, i, 0);
            while ((1 << root) & i) == 0 {
                root += 1;
            }
            let mut q = std::collections::VecDeque::<usize>::new();
            q.push_back(root);
            mask &= !(1 << root);
            while !q.is_empty() {
                let cur = q.pop_front().unwrap();
                last = cur;
                for next in nodes[cur].iter() {
                    if (mask & (1 << next)) != 0 {
                        mask &= !(1 << next);
                        q.push_back(*next);
                    }
                }
            }
            if mask == 0 {
                let d = Solution::dfs(&nodes, last, i & !(1 << last));
                if d >= 1 {
                    res[d - 1] += 1;
                }
            }
        }
        res
    }
    fn dfs(nodes: &Vec<Vec<usize>>, root: usize, mask: usize) -> usize {
        if mask == 0 {
            0
        } else {
            let mut res = 0;
            for next in nodes[root].iter() {
                if (mask & (1 << next)) != 0 {
                    res = res.max(Solution::dfs(nodes, *next, mask & !(1 << *next)) + 1)
                }
            }
            res
        }
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

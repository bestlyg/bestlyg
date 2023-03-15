import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1615. 最大网络秩',
  url: 'https://leetcode.cn/problems/maximal-network-rank///',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你整数 n 和数组 roads，返回整个基础设施网络的 最大网络秩 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 96,
      memory: 38.1,
      desc: '枚举',
      code: `class Solution {
public:
    int maximalNetworkRank(int n, vector<vector<int>>& roads) {
        vector<unordered_set<int>> list(n);
        for (auto &road : roads) {
            list[road[0]].insert(road[1]);
            list[road[1]].insert(road[0]);
        }
        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    int add = list[i].count(j) ? -1 : 0;
                    res = max(res, add + (int)list[i].size() + (int)list[j].size());
                }
            }
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 120,
      memory: 16.7,
      desc: '同上',
      code: `class Solution:
    def maximalNetworkRank(self, n: int, roads: List[List[int]]) -> int:
        l = [set() for _ in range(n)]
        for [n1, n2] in roads:
            l[n1].add(n2)
            l[n2].add(n1)
        res = 0
        for i in range(n):
            for j in range(n):
                if i != j:
                    res = max(res, len(l[i]) + len(l[j]) + (-1 if j in l[i] else 0))
        return res`,
    },
    {
      script: Script.RUST,
      time: 24,
      memory: 2.4,
      desc: '同上',
      code: `impl Solution {
    pub fn maximal_network_rank(n: i32, roads: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut list = vec![std::collections::HashSet::<usize>::new(); n];
        for road in roads {
            let (n1, n2) = (road[0] as usize, road[1] as usize);
            list[n1].insert(n2);
            list[n2].insert(n1);
        }
        let mut res = 0;
        for i in 0..n {
            for j in 0..n {
                if i != j {
                    let add = if list[i].contains(&j) { -1 } else { 0 };
                    res = res.max(list[i].len() as i32 + list[j].len() as i32 + add);
                }
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '6356. 收集树中金币',
  url: 'https://leetcode.cn/problems/collect-coins-in-a-tree/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `你需要收集树中所有的金币，并且回到出发节点，请你返回最少经过的边数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 632,
      memory: 206.8,
      desc: '先删除所有没有金币的叶子节点，再遍历两次，删除有金币的叶子节点，剩下的节点就是所有需要遍历的节点。',
      code: `class Solution {
public:
    int collectTheCoins(vector<int>& coins, vector<vector<int>>& edges) {
        int n = coins.size();
        vector<vector<int>> list(n);
        vector<int> cnts(n, 0);
        for (auto &edge : edges) {
            list[edge[0]].push_back(edge[1]);
            list[edge[1]].push_back(edge[0]);
            cnts[edge[0]] += 1;
            cnts[edge[1]] += 1;
        }
        int cur_edges = n - 1;
        queue<int> q;
        // 第一次刪除所有的无金币叶子节点
        for (int i = 0; i < n; i++) {
            if (cnts[i] == 1 && coins[i] == 0) q.push(i); 
        }
        while (q.size()) {
            int idx = q.front();
            q.pop();
            cur_edges -= 1;
            for (auto &next : list[idx]) {
                cnts[next] -= 1;
                if (cnts[next] == 1 && coins[next] == 0) q.push(next);
            }
        }
        // 第二次寻找所有的叶子金币节点
        for (int i = 0; i < n; i++) {
            if (cnts[i] == 1 && coins[i] == 1) q.push(i);
        }
        cur_edges -= q.size();
        while (q.size()) {
            int idx = q.front();
            q.pop();
            for (auto &next : list[idx]) {
                cnts[next] -= 1;
                if (cnts[next] == 1) {
                    cnts[next] -= 1;
                    cur_edges -= 1;
                }
            }
        }
        return max(cur_edges * 2, 0);
    }
};`,
    },
    {
      script: Script.PY3,
      time: 256,
      memory: 27.6,
      desc: '同上',
      code: `class Solution:
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        n = len(coins)
        l = [[] for _ in range(n)]
        cnts = [0] * n
        for edge in edges:
            l[edge[0]].append(edge[1])
            l[edge[1]].append(edge[0])
            cnts[edge[0]] += 1
            cnts[edge[1]] += 1
        cur_edges = n - 1
        q = deque()
        for i in range(n):
            if cnts[i] == 1 and coins[i] == 0:
                q.append(i)
        while len(q):
            idx = q.popleft()
            cur_edges -= 1
            for ne in l[idx]:
                cnts[ne] -= 1
                if cnts[ne] == 1 and coins[ne] == 0:
                    q.append(ne)
        for i in range(n):
            if cnts[i] == 1 and coins[i] == 1:
                q.append(i)
        cur_edges -= len(q)
        while len(q):
            idx = q.popleft()
            for ne in l[idx]:
                cnts[ne] -= 1
                if cnts[ne] == 1:
                    cnts[ne] -= 1
                    cur_edges -= 1
        return max(cur_edges * 2, 0)`,
    },
    {
      script: Script.RUST,
      time: 52,
      memory: 5.2,
      desc: '同上',
      code: `impl Solution {
    pub fn collect_the_coins(coins: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = coins.len();
        let mut list = vec![vec![]; n];
        let mut cnts = vec![0; n];
        for edge in edges {
            list[edge[0] as usize].push(edge[1]);
            list[edge[1] as usize].push(edge[0]);
            cnts[edge[0] as usize] += 1;
            cnts[edge[1] as usize] += 1;
        }
        let mut cur_edges = n - 1;
        let mut q = std::collections::VecDeque::<usize>::new();
        for i in 0..n {
            if cnts[i] == 1 && coins[i] == 0 {
                q.push_back(i);
            }
        }
        while !q.is_empty() {
            let idx = q.pop_front().unwrap();
            cur_edges -= 1;
            for next in list[idx].iter() {
                let next = *next as usize;
                cnts[next] -= 1;
                if cnts[next] == 1 && coins[next] == 0 {
                    q.push_back(next)
                }
            }
        }
        for i in 0..n {
            if cnts[i] == 1 && coins[i] == 1 {
                q.push_back(i);
            }
        }
        cur_edges -= q.len();
        while !q.is_empty() {
            let idx = q.pop_front().unwrap();
            for next in list[idx].iter() {
                let next = *next as usize;
                cnts[next] -= 1;
                if cnts[next] == 1 {
                    cnts[next] -= 1;
                    cur_edges -= 1;
                }
            }
        }
        0.max(2 * cur_edges as i32)
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

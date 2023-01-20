import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1817. 查找用户活跃分钟数',
  url: 'https://leetcode.cn/problems/finding-the-users-active-minutes/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组,Tag.哈希表],
  desc: `请你统计用户活跃分钟数的分布情况，统计结果是一个长度为 k 且 下标从 1 开始计数 的数组 answer ，对于每个 j（1 <= j <= k），answer[j] 表示 用户活跃分钟数 等于 j 的用户数。`,
  solutions: [
    {
      script: Script.CPP,
      time: 208,
      memory: 83.4,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> findingUsersActiveMinutes(vector<vector<int>>& logs, int k) {
        vector<int> list(k, 0);
        unordered_map<int, unordered_set<int>> m;
        for (auto &log : logs) m[log[0]].insert(log[1]);
        for (auto &user : m) list[user.second.size() - 1]++;
        return list;
    }
};`,
    },
    {
      script: Script.RUST,
      time: 60,
      memory: 4.9,
      desc: '同上',
      code: `impl Solution {
    pub fn finding_users_active_minutes(logs: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        use std::collections::{HashMap, HashSet};
        let mut ans = vec![0; k as usize];
        let mut m = HashMap::<i32, HashSet<i32>>::new();
        for log in logs {
            let s = m.entry(log[0]).or_insert(HashSet::new());
            s.insert(log[1]);
        }
        for (_, v) in m {
            ans[v.len() - 1] += 1;
        }
        ans
    }
}`,
    },
    {
      script: Script.PY3,
      time: 132,
      memory: 20.5,
      desc: '同上',
      code: `class Solution:
def findingUsersActiveMinutes(self, logs: List[List[int]], k: int) -> List[int]:
    ans = [0 for _ in range(k)]
    m = {}
    for log in logs:
        s = m.setdefault(log[0], set())
        s.add(log[1])
    for (_, v) in m.items():
        ans[len(v) - 1] += 1
    return ans`,
    },
  ],
};

export default leetCodeMarkdown;

import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1125. 最小的必要团队',
  url: 'https://leetcode.cn/problems/smallest-sufficient-team/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回 任一 规模最小的必要团队，团队成员用人员编号表示。`,
  solutions: [
    {
      script: Script.CPP,
      time: 52,
      memory: 19.1,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> smallestSufficientTeam(vector<string>& req_skills, vector<vector<string>>& people) {
        int n = req_skills.size(), m = people.size(), nmask = (1 << n) - 1;
        unordered_map<string, int> keym;
        for (int i = 0; i < n; i++) keym[req_skills[i]] = i;
        vector<vector<int>> dp(1 << n);
        for (int i = 0; i < m; i++) {
            int mask = 0;
            for (auto &key : people[i]) mask |= 1 << keym[key];
            for (int pmask = 0; pmask <= nmask; pmask++) {
                int merged = mask | pmask;
                if (merged == pmask || 
                    pmask && dp[pmask].empty() || 
                    dp[merged].size() && dp[merged].size() <= dp[pmask].size() + 1) continue;
                dp[merged] = dp[pmask];
                dp[merged].push_back(i);
            }
        }
        return dp[nmask];
    }
};`,
    },
    {
      script: Script.PY3,
      time: 652,
      memory: 21.4,
      desc: '同上',
      code: ` class Solution:
    def smallestSufficientTeam(self, req_skills: List[str], people: List[List[str]]) -> List[int]:
        n, m = len(req_skills), len(people)
        nmask = (1 << n) - 1
        keym = {}
        for i in range(n):
            keym[req_skills[i]] = i
        dp = [list() for _ in range(1 << n)]
        for i in range(m):
            mask = 0
            for key in people[i]:
                mask |= 1 << keym[key]
            for pmask in range(nmask + 1):
                merged = mask | pmask
                if merged == pmask or pmask and len(dp[pmask]) == 0 or len(dp[merged]) and len(dp[merged]) <= len(dp[pmask]) + 1:
                    continue
                dp[merged] = dp[pmask] + [i]
        return dp[nmask]`,
    },
    {
      script: Script.RUST,
      time: 12,
      memory: 5.7,
      desc: '同上',
      code: `impl Solution {
    pub fn smallest_sufficient_team(req_skills: Vec<String>, people: Vec<Vec<String>>) -> Vec<i32> {
        use std::collections::HashMap;
        let (n, m) = (req_skills.len(), people.len());
        let nmask = (1 << n) - 1;
        let mut keym = HashMap::<String, usize>::new();
        let mut i = 0;
        for key in req_skills {
            keym.insert(key, i);
            i += 1;
        }
        let mut dp: Vec<Vec<i32>> = vec![vec![]; 1 << n];
        for i in 0..m {
            let mut mask = 0;
            for key in people[i].iter() {
                mask |= 1 << keym.get(key).unwrap();
            }
            for pmask in 0..=nmask {
                let merged = mask | pmask;
                if merged == pmask
                    || pmask > 0 && dp[pmask].is_empty()
                    || !dp[merged].is_empty() && dp[merged].len() <= dp[pmask].len() + 1
                {
                    continue;
                }
                dp[merged] = dp[pmask].clone();
                dp[merged].push(i as i32);
            }
        }
        dp[nmask].clone()
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

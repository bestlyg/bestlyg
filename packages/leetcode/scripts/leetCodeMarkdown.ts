import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1626. 无矛盾的最佳球队',
  url: 'https://leetcode.cn/problems/best-team-with-no-conflicts//',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `给你两个列表 scores 和 ages，其中每组 scores[i] 和 ages[i] 表示第 i 名球员的分数和年龄。请你返回 所有可能的无矛盾球队中得分最高那支的分数 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 452,
      memory: 18.4,
      desc: 'dp[i]表示以i为结尾时的最大分数',
      code: `class Solution {
public:
    int bestTeamScore(vector<int>& scores, vector<int>& ages) {
        int n = scores.size(), res = 0;
        vector<int> idx(n), dp(n, 0);
        for (int i = 0; i < n; i++) idx[i] = i;
        sort(idx.begin(), idx.end(), [&](auto &a, auto &b){
            return ages[a] != ages[b] ? ages[a] < ages[b] : scores[a] < scores[b];
        });
        for (int i = 0; i < n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (ages[idx[i]] == ages[idx[j]] || ages[idx[i]] > ages[idx[j]] && scores[idx[i]] >= scores[idx[j]])
                    dp[i] = max(dp[i], dp[j]);
            }
            dp[i] += scores[idx[i]];
            res = max(res, dp[i]);
        }
        return res;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 2676,
      memory: 15.1,
      desc: '同上',
      code: `class Solution:
    def bestTeamScore(self, scores: List[int], ages: List[int]) -> int:
        n, res = len(scores), 0
        l = sorted(zip(ages, scores))
        dp = [0] * n
        for i in range(n):
            for j in range(i-1, -1, -1):
                if l[i][0] == l[j][0] or (l[i][0] > l[j][0] and l[i][1] >= l[j][1]):
                    dp[i] = max(dp[i], dp[j])
            dp[i] += l[i][1]
            res = max(res, dp[i])
        return res`,
    },
    {
      script: Script.RUST,
      time: 44,
      memory: 2.1,
      desc: '同上',
      code: `impl Solution {
    pub fn best_team_score(scores: Vec<i32>, ages: Vec<i32>) -> i32 {
        let (n, mut res) = (scores.len(), 0);
        let mut idx = (0..n).collect::<Vec<usize>>();
        idx.sort_by(|a, b| {
            if ages[*a] != ages[*b] {
                ages[*a].cmp(&ages[*b])
            } else {
                scores[*a].cmp(&scores[*b])
            }
        });
        let mut dp = vec![0; n];
        for i in 0..n as i32 {
            for j in ((0i32)..=(i - 1)).rev() {
                let (i, j) = (i as usize, j as usize);
                if ages[idx[i]] == ages[idx[j]]
                    || ages[idx[i]] > ages[idx[j]] && scores[idx[i]] >= scores[idx[j]]
                {
                    dp[i] = dp[i].max(dp[j]);
                }
            }

            dp[i as usize] += scores[idx[i as usize]];
            res = res.max(dp[i as usize]);
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

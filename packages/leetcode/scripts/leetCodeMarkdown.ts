import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '1124. 表现良好的最长时间段',
  url: 'https://leetcode.cn/problems/replace-the-substring-for-balanced-string/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请返回待替换子串的最小可能长度。`,
  solutions: [
    {
      script: Script.CPP,
      time: 32,
      memory: 23.3,
      desc: '单调栈，找出最远最小的值',
      code: `class Solution {
public:
    int longestWPI(vector<int>& hours) {
        int n = hours.size(), ans = 0;
        for (auto &h : hours) h = h > 8 ? 1 : -1;
        vector<int> sums(1, 0);
        for (auto &h : hours) sums.push_back(sums.back() + h);
        stack<int> s; s.push(0);
        for (int i = 1; i <= n; i++) {
            if (sums[s.top()] > sums[i]) s.push(i);
        }
        for (int i = n; i >= 1; i--) {
            while (s.size() && sums[s.top()] < sums[i]) {
                ans = max(ans, i - s.top());
                s.pop();
            }
        }
        return ans;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 72,
      memory: 15.7,
      desc: '同上',
      code: `class Solution:
    def longestWPI(self, hours: List[int]) -> int:
        n = len(hours)
        ans = 0
        sums = [0]
        for h in hours:
            v = -1
            if (h > 8):
                v = 1
            sums.append(sums[-1] + v)
        s = [0]
        for i in range(1, n+1):
            if sums[s[-1]] > sums[i]:
                s.append(i)
        for i in range(n, 0, -1):
            while len(s) and sums[s[-1]] < sums[i]:
                ans = max(ans, i - s.pop())
        return ans`,
    },
    {
      script: Script.RUST,
      time: 12,
      memory:2.4,
      desc: '同上',
      code: `impl Solution {
    pub fn longest_wpi(hours: Vec<i32>) -> i32 {
        use std::collections::VecDeque;
        let n = hours.len();
        let mut ans = 0;
        let mut sums = vec![0; 1];
        for h in hours {
            let h: i32 = if h > 8 { 1 } else { -1 };
            sums.push(sums.last().unwrap() + h);
        }
        let mut s = VecDeque::<usize>::new();
        s.push_back(0);
        for i in 1..=n {
            if sums[*s.back().unwrap()] > sums[i] {
                s.push_back(i);
            }
        }
        let mut i = n;
        while i >= 1 {
            while !s.is_empty() && sums[*s.back().unwrap()] < sums[i] {
                ans = ans.max(i as i32 - s.pop_back().unwrap() as i32);
            }
            i -= 1;
        }
        ans
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;


import { Markdown, Difficulty, Tag, Script } from '@/base';

const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1326. 灌溉花园的最少水龙头数目',
  url: 'https://leetcode.cn/problems/minimum-number-of-taps-to-open-to-water-a-garden/',
  difficulty: Difficulty.中等,
  tag: [Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `请你返回可以灌溉整个花园的 最少水龙头数目 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 16,
      memory: 14.3,
      desc: '贪心，对每个起点找尽可能远的终点',
      code: `class Solution {
public:
    int minTaps(int n, vector<int>& ranges) {
        vector<int> list(n + 1, -1);
        for (int i = 0; i < n + 1; i++) {
            int start = max(i - ranges[i], 0), end = min(i + ranges[i], n);
            list[start] = max(list[start], end);
        }
        int cnt = 0, prev = 0, last = 0;
        for (int i = 0; i < n; i++) {
            last = max(last, list[i]);
            if (last == i) return -1;
            if (i == prev) cnt++, prev = last;
        }
        return cnt;
    }
};`,
    },
    {
      script: Script.PY3,
      time: 84,
      memory: 15.3,
      desc: '同上',
      code: `class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        l = [-1] * (n + 1)
        for i in range(len(ranges)):
            start = max(i - ranges[i], 0)
            end = min(i + ranges[i], n)
            l[start] = max(l[start], end)
        cnt = prev = last = 0
        for i in range(n):
            last = max(last, l[i])
            if last == i:
                return -1
            if i == prev:
                prev = last
                cnt += 1
        return cnt`,
    },
    {
      script: Script.RUST,
      time: 4,
      memory: 2.4,
      desc: '同上',
      code: `impl Solution {
    pub fn min_taps(n: i32, ranges: Vec<i32>) -> i32 {
        let n = n as usize;
        let mut l = vec![0; n + 1];
        for i in 0..ranges.len() {
            let start = 0.max(i as i32 - ranges[i]) as usize;
            let end = (n as i32).min(i as i32 + ranges[i]) as usize;
            l[start] = l[start].max(end);
        }
        let (mut res, mut pre, mut last) = (0, 0, 0);
        for i in 0..n {
            last = last.max(l[i]);
            if last == i {
                return -1;
            }
            if i == pre {
                res += 1;
                pre = last
            }
        }
        res
    }
}`,
    },
  ],
};

export default leetCodeMarkdown;

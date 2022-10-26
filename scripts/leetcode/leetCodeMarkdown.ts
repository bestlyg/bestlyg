import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: true,
  name: '862. 和至少为 K 的最短子数组',
  url: 'https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/',
  difficulty: Difficulty.中等,
  tag: [Tag.深度优先搜索, Tag.广度优先搜索, Tag.数组, Tag.矩阵],
  desc: `返回必须翻转的 0 的最小数目。`,
  solutions: [
    {
      script: Script.CPP,
      time: 204,
      memory: 102.3,
      desc: '前缀和+单调递增队列，遍历到一个值时，可以快速知道前面的前缀和',
      code: `class Solution {
public:
    int shortestSubarray(vector<int>& nums, int k) {
        int n = nums.size(), ans = 0x7fffffff;
        vector<long long> sums(1 + n, 0);
        for (int i = 0; i < n; i++) sums[i + 1] = sums[i] + nums[i];
        deque<int> q;
        q.push_back(0);
        for (int i = 0; i < n; i++) {
            int idx = -1;
            while (q.size() && sums[i + 1] - sums[q.front()] >= k) idx = q.front(), q.pop_front();
            if (idx != -1) ans = min(ans, i + 1 - idx);
            while (q.size() && sums[q.back()] > sums[i + 1]) q.pop_back();
            q.push_back(i + 1);
        }
        return ans == 0x7fffffff ? -1 : ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;

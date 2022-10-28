import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '907. 子数组的最小值之和',
  url: 'https://leetcode.cn/problems/sum-of-subarray-minimums/',
  difficulty: Difficulty.中等,
  tag: [Tag.栈, Tag.数组, Tag.动态规划, Tag.单调栈],
  desc: `给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。`,
  solutions: [
    {
      script: Script.CPP,
      time: 104,
      memory: 41.3,
      desc: '单调栈，统计每个点第一个左边大的数，和第二个右边大的数，统计左边数量+右边数量+左右交叉数量',
      code: `class Solution {
public:
    const int mod = 1e9 + 7;
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        long long ans = 0;
        vector<int> l(n, -1), r(n, n);
        stack<int> s;
        for (int i = 0; i < n; i++) {
            while (s.size() && arr[s.top()] > arr[i]) r[s.top()] = i, s.pop();
            if (s.size()) l[i] = s.top();
            s.push(i);
        }
        for (int i = 0; i < n; i++) {
            int left = i - l[i] - 1, right = r[i] - i - 1;
            ans = (ans +(static_cast<long long>(left) + right + left * right + 1) * arr[i]) % mod;
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;

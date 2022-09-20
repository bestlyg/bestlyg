import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '698. 划分为k个相等的子集',
  url: 'https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/',
  difficulty: Difficulty.中等,
  tag: [Tag.位运算, Tag.记忆化搜索, Tag.数组, Tag.动态规划, Tag.回溯, Tag.状态压缩],
  desc: `给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9,
      desc: '构造k个桶进行回溯+剪枝',
      code: `class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        sort(nums.rbegin(), nums.rend());
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % k != 0) return false; else sum /= k;
        vector<int> list(k, 0);
        return dfs(nums, list, sum, 0);
    }
    bool dfs(vector<int> &nums, vector<int> &list, int sum, int i) {
        if (i == nums.size()) {
            for (auto &item : list) if (item != sum) return false;
            return true;
        }
        for (int j = 0; j < list.size(); j++) {
            if (list[j] + nums[i] > sum || j && list[j - 1] == list[j]) continue;
            list[j] += nums[i];
            if (dfs(nums, list, sum, i + 1)) return true;
            list[j] -= nums[i];
        }
        return false;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;

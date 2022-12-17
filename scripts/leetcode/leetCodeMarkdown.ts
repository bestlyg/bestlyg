import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1764. 通过连接另一个数组的子数组得到一个数组',
  url: 'https://leetcode.cn/problems/form-array-by-concatenating-subarrays-of-another-array/',
  difficulty: Difficulty.中等,
  tag: [Tag.贪心, Tag.数组, Tag.字符串匹配],
  desc: `给你一个长度为 n 的二维整数数组 groups ，同时给你一个整数数组 nums 。如果你可以找出这样的 n 个子数组，请你返回 true ，否则返回 false 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 100,
      memory: 71.7,
      desc: '遍历',
      code: `class Solution {
public:
    bool canChoose(vector<vector<int>>& groups, vector<int>& nums) {
        auto check = [&](int igroup, int inum) -> bool {
            int i = 0;
            for (; i < groups[igroup].size() && inum < nums.size(); i++, inum++)
                if (groups[igroup][i] != nums[inum]) return false;
            return i == groups[igroup].size();
        };
        int j = 0;
        for (int i = 0; i < groups.size(); i++) {
            while (j < nums.size() && (nums[j] != groups[i][0] || !check(i, j))) j++;
            if (j == nums.size()) return false;
            j += groups[i].size();
        }
        return true;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;

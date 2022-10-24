import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '915. 分割数组',
  url: 'https://leetcode.cn/problems/partition-array-into-disjoint-intervals/',
  difficulty: Difficulty.中等,
  tag: [Tag.数组],
  desc: `在完成这样的分组后返回 left 的 长度 。`,
  solutions: [
    {
      script: Script.CPP,
      time: 732,
      memory: 136.2,
      desc: '维护有序序列',
      code: `class Solution {
public:
    int partitionDisjoint(vector<int>& nums) {
        int n = nums.size();
        map<int, int> m1, m2;
        m1[nums[0]]++;
        for (int i = 1; i < n; i++) m2[nums[i]]++;
        int idx = 1;
        while (m1.crbegin()->first > m2.cbegin()->first) {
            m1[nums[idx]]++;
            m2[nums[idx]]--;
            if (m2[nums[idx]] == 0) m2.erase(nums[idx]);
            ++idx;
        }
        return idx;
    }
};`,
    },
    {
      script: Script.CPP,
      time: 140,
      memory: 91.9,
      desc: '一次遍历，维护左边的最大值',
      code: `class Solution {
public:
    int partitionDisjoint(vector<int>& nums) {
        int n = nums.size(), cur_max = nums[0], ans = 1, ans_max = nums[0];
        for (int i = 1; i < n; i++) {
            cur_max = max(cur_max, nums[i]);
            if (nums[i] < ans_max) {
                ans_max = cur_max;
                ans = i + 1;
            }
        }
        return ans;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;

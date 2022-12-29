import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '2032. 至少在两个数组中出现的值',
  url: 'https://leetcode.cn/problems/two-out-of-three/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.哈希表],
  desc: `给你三个整数数组 nums1、nums2 和 nums3 ，请你构造并返回一个 元素各不相同的 数组，且由 至少 在 两个 数组中出现的所有值组成。`,
  solutions: [
    {
      script: Script.CPP,
      time: 20,
      memory: 26,
      desc: '遍历',
      code: `class Solution {
public:
    vector<int> twoOutOfThree(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3) {
        unordered_set<int> ans, s1, s2;
        for (auto &num : nums1) s1.insert(num);
        for (auto &num : nums2) {
            if (s1.count(num)) ans.insert(num);
            s2.insert(num);
        }
        for (auto &num : nums3) {
            if (s1.count(num) || s2.count(num)) ans.insert(num);
        }
        return vector<int>(ans.begin(), ans.end());
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;

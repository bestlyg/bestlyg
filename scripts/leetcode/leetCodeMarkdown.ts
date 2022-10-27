import { Markdown, Difficulty, Tag, Script, utils } from './leetcode';

const { specStr, markdown } = utils;
const { backquote } = specStr;
const { link } = markdown;
const leetCodeMarkdown: Markdown = {
  exist: !true,
  name: '1822. 数组元素积的符号',
  url: 'https://leetcode.cn/problems/sign-of-the-product-of-an-array/',
  difficulty: Difficulty.简单,
  tag: [Tag.数组, Tag.数学],
  desc: `给你一个整数数组 nums 。令 product 为数组 nums 中所有元素值的乘积。`,
  solutions: [
    {
      script: Script.CPP,
      time: 4,
      memory: 9.9,
      desc: '遍历检查有几个负数',
      code: `class Solution {
public:
    int arraySign(vector<int>& nums) {
        int cnt = 0;
        for (auto &num : nums) {
            if (num == 0) return 0;
            else if (num < 0) cnt ^= 1;
        }
        return cnt ? -1 : 1;
    }
};`,
    },
  ],
};
export default leetCodeMarkdown;
